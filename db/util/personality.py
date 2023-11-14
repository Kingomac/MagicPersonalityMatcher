from models import Character


def personality_to_text(character: Character):
    return\
        "I" if character.personality_ie else "E" +\
        "S" if character.personality_sn else "N" +\
        "T" if character.personality_tf else "F" +\
        "J" if character.personality_jp else "P"
