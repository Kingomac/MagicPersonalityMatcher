from typing import TypedDict, Literal


class ScrapedCharacter(TypedDict):
    name: str
    image: str
    personality: Literal["ISTJ", "ISFJ", "INFJ", "INTJ",
                         "ISTP", "ISFP", "INFP", "INTP",
                         "ESTP", "ESFP", "ENFP", "ENTP",
                         "ESTJ", "ESFJ", "ENFJ", "ENTJ"]


class ScrapedSerie(TypedDict):
    name: str
    image: str
