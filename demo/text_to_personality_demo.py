from backend.services import TextToPersonality


if __name__ == '__main__':
    print("Introduce texto para obtener su personalidad:")
    text = input()
    while text != "exit":
        print(TextToPersonality.predict(text))
        text = input()
