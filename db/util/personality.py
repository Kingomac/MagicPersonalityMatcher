from db.models import Character


def personality_to_text(character: Character):
    toret = ""
    toret += "I" if character.personality_ie else "E"
    toret += "S" if character.personality_sn else "N"
    toret += "T" if character.personality_tf else "F"
    toret += "J" if character.personality_jp else "P"
    return toret


def text_to_personality(text: str):
    text = text.upper()
    toret = []
    toret.append(text[0] == "I")
    toret.append(text[1] == "S")
    toret.append(text[2] == "T")
    toret.append(text[3] == "J")
    return toret