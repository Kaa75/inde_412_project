from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
from presidio_image_redactor import ImageRedactorEngine
from PIL import Image
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/text-anonymize", methods=["POST"])
def text_anonymize():
    try:
        text = request.json["text"]
        
        if not text:
            return jsonify({"error": "No text provided"}), 400

        analyzer = AnalyzerEngine()
        anonymizer = AnonymizerEngine()

        analyzer_results = analyzer.analyze(
            text=text, 
            entities=["PERSON", "PHONE_NUMBER", "EMAIL_ADDRESS", "CREDIT_CARD"], 
            language="en"
        )

        anonymized_text = anonymizer.anonymize(text=text, analyzer_results=[analyzer_results])

        return jsonify({"text": anonymized_text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/image-anonymize", methods=["POST"])
def image_anonymize():
    try:
        image = request.files.get("image")

        if not image:
            return jsonify({"error": "No image provided"}), 400
        
        image = Image.open(image)

        redactor = ImageRedactorEngine()
        redactor.redact(image=image)

        return jsonify({"image": image}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8765, debug=True)
