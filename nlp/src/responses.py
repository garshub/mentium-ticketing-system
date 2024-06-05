from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import numpy as np
import joblib

# Function to load training data from a file
def load_training_data(file_path):
    training_data = []
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            input_text, response_text = line.strip().split('|')
            training_data.append((input_text, response_text))
    return training_data

# Load training data from file
training_data = load_training_data('data/training_data.txt')

# Separate input and output (X and y)
X_train = [x[0] for x in training_data]
y_train = [x[1] for x in training_data]

# Vectorize input text using TF-IDF
vectorizer = TfidfVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)

# Train a Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(X_train_vectorized, y_train)

# Save the trained model and vectorizer
joblib.dump(classifier, 'models/naive_bayes_model.pkl')
joblib.dump(vectorizer, 'models/tfidf_vectorizer.pkl')

# Function to suggest top n responses given input text
def suggest_top_responses(input_text, n=3):
    input_vectorized = vectorizer.transform([input_text])
    prob_scores = classifier.predict_proba(input_vectorized)
    top_indices = np.argsort(prob_scores, axis=1)[0][-n:][::-1]  # Indices of top n responses
    top_responses = [classifier.classes_[i] for i in top_indices]  # Get the actual responses
    return top_responses

# Example usage
input_text = "I have not received my order yet."
top_responses = suggest_top_responses(input_text)
print("Top 3 Responses:")
for i, response in enumerate(top_responses, 1):
    print(f"{i}. {response}")
