import joblib as jb
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer

class TextToPersonality:
    bow: TfidfVectorizer = jb.load("ml_model/bow.lzma") #pickle.load(open('ml_model/bow.pkl','rb'))
    model: RandomForestClassifier = jb.load("ml_model/model.lzma")

    NUM_PERSONALITY = {
    1: 'ISTJ',
    2: 'ISFJ',
    3: 'INFJ',
    4: 'INTJ',
    5: 'ISTP',
    6: 'ISFP',
    7: 'INFP',
    8: 'INTP',
    9: 'ESTP',
    10: 'ESFP',
    11: 'ENFP',
    12: 'ENTP',
    13: 'ESTJ',
    14: 'ESFJ',
    15: 'ENFJ',
    16: 'ENTJ'
}
    PERSONALITY_NUM = {
    'ISTJ': 1,
    'ISFJ': 2,
    'INFJ': 3,
    'INTJ': 4,
    'ISTP': 5,
    'ISFP': 6,
    'INFP': 7,
    'INTP': 8,
    'ESTP': 9,
    'ESFP': 10,
    'ENFP': 11,
    'ENTP': 12,
    'ESTJ': 13,
    'ESFJ': 14,
    'ENFJ': 15,
    'ENTJ': 16
}

    @staticmethod
    def predict(text: str):
        preprocessed = TextToPersonality.bow.transform([text])
        return TextToPersonality.NUM_PERSONALITY[TextToPersonality.model.predict(preprocessed)[0]]
    
    def add_rating(text: str, personality: str):
        preprocessed_text = TextToPersonality.bow.transform([text])
        personality = TextToPersonality.PERSONALITY_NUM[personality]
        TextToPersonality.model.fit(preprocessed_text, [personality])

