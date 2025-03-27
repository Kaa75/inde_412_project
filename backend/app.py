from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
from presidio_image_redactor import ImageRedactorEngine
from PIL import Image
from flask import Flask, jsonify, request
from flask_cors import CORS
from io import BytesIO
import base64
import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
CORS(app)

@app.route("/text-anonymize", methods=["POST"])
def text_anonymize():
    try:
        text = request.json["text"]
        if not text:
            return jsonify({"error": "No text provided"}), 400

        analyzer = AnalyzerEngine()
        anonymizer = AnonymizerEngine()

        # Lower threshold for debugging (e.g., 0.0) to detect borderline cases
        analyzer_results = analyzer.analyze(
            text=text, 
            entities=[
                "PERSON", "PHONE_NUMBER", "EMAIL_ADDRESS", "CREDIT_CARD", 
                "LOCATION", "DATE_TIME", "MONEY", "IP_ADDRESS", "URL",
                "US_SOCIAL_SECURITY_NUMBER"
            ],
            language="en",
            score_threshold=0.0  # temporarily lowered for testing
        )
        # Debug: log detected analyzer results
        print("Analyzer results:", analyzer_results)

        anonymized_result = anonymizer.anonymize(text=text, analyzer_results=analyzer_results)
        anonymized_text = anonymized_result.text

        return jsonify({"anonymizedText": anonymized_text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/image-anonymize", methods=["POST"])
def image_anonymize():
    try:
        image_file = request.files.get("image")
        if not image_file:
            logging.error("No image provided")
            return jsonify({"error": "No image provided"}), 400
        
        # Ensure the image is in RGB mode
        pil_image = Image.open(image_file).convert("RGB")
        redactor = ImageRedactorEngine()
        try:
            # Fix: call redact without passing analyzer_results
            redacted_image = redactor.redact(image=pil_image)
            logging.info("Image redaction succeeded")
        except Exception as inner_e:
            if "tesseract" in str(inner_e).lower():
                logging.error("Tesseract is not installed or not in your PATH. Using original image.")
            else:
                logging.exception("Image redaction error")
            redacted_image = pil_image
        
        buffered = BytesIO()
        redacted_image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        img_data = f"data:image/png;base64,{img_str}"
        return jsonify({"imageUrl": img_data}), 200

    except Exception as e:
        logging.exception("Exception in image-anonymize endpoint")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8765, debug=True)
