import joblib as jb

class TextToPersonality:
    bow = jb.load("ml_model/bow.lzma") #pickle.load(open('ml_model/bow.pkl','rb'))
    model = jb.load("ml_model/model.lzma")

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

    @staticmethod
    def predict(text: str):
        preprocessed = TextToPersonality.bow.transform([text])
        return TextToPersonality.NUM_PERSONALITY[TextToPersonality.model.predict(preprocessed)[0]]

