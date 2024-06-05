import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

# Load the trained model and vectorizer
classifier = joblib.load('models/naive_bayes_model.pkl')
vectorizer = joblib.load('models/tfidf_vectorizer.pkl')

# Function to suggest top n responses given input text
def suggest_top_responses(input_text, n=3):
    input_vectorized = vectorizer.transform([input_text])
    prob_scores = classifier.predict_proba(input_vectorized)
    top_indices = np.argsort(prob_scores, axis=1)[0][-n:][::-1]  # Indices of top n responses
    top_responses = [classifier.classes_[i] for i in top_indices]  # Get the actual responses
    return top_responses

# Example usage
input_text = "I want my refund. Order not yet delivered"
top_responses = suggest_top_responses(input_text)
print("Top 3 Responses:")
for i, response in enumerate(top_responses, 1):
    print(f"{i}. {response}")
