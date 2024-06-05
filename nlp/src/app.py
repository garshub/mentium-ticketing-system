import joblib
import numpy as np
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from flask_cors import CORS

# Load the trained model and vectorizer
classifier = joblib.load('models/naive_bayes_model.pkl')
vectorizer = joblib.load('models/tfidf_vectorizer.pkl')

app = Flask(__name__)
CORS(app)

# Function to suggest top n responses given input text
def suggest_top_responses(input_text, n=3):
    input_vectorized = vectorizer.transform([input_text])
    prob_scores = classifier.predict_proba(input_vectorized)
    top_indices = np.argsort(prob_scores, axis=1)[0][-n:][::-1]  # Indices of top n responses
    top_responses = [classifier.classes_[i] for i in top_indices]  # Get the actual responses
    return top_responses

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    input_text = data.get('input_text')
    n = data.get('n', 3)  # Default to top 3 responses if not provided
    responses = suggest_top_responses(input_text, n)
    print(responses)
    return jsonify(responses)

@app.route('/ping', methods=['GET'])
def ping():
    return "Alive"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004)
