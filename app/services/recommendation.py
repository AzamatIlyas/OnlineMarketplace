from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class RecommendationService:

    def build_similarity_matrix(ads):
        texts = [
            f"{ad.title} {ad.description} category_{ad.category_id}"
            for ad in ads
        ]

        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix = vectorizer.fit_transform(texts)

        similarity_matrix = cosine_similarity(tfidf_matrix)

        return similarity_matrix
