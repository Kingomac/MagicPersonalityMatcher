from sqlalchemy import (
    BigInteger,
    String,
    Boolean,
    ForeignKey
)
from sqlalchemy.orm import mapped_column, relationship, Mapped
from .base import Base


class Character(Base):
    __tablename__ = "character"
    id: Mapped[int] = mapped_column(
        BigInteger(), primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    image: Mapped[str] = mapped_column(String(200), nullable=False)
    personality_ie: Mapped[bool] = mapped_column(
        Boolean(), nullable=False)  # True = I, False = E
    personality_sn: Mapped[bool] = mapped_column(
        Boolean(), nullable=False)  # True = S, False = N
    personality_tf: Mapped[bool] = mapped_column(
        Boolean(), nullable=False)  # True = T, False = F
    personality_jp: Mapped[bool] = mapped_column(
        Boolean(), nullable=False)  # True = J, False = P
    # Relationship one to many with serie (this is child)
    serie_id: Mapped[int] = mapped_column(
        ForeignKey("serie.id", ondelete='SET NULL'), nullable=True)
    serie: Mapped["Serie"] = relationship(back_populates="characters")

    def __init__(self, name, image, serie, personality_str: str):
        self.name = name
        self.image = image
        self.serie = serie
        self.personality_ie = personality_str[0] == "I"
        self.personality_sn = personality_str[1] == "S"
        self.personality_tf = personality_str[2] == "T"
        self.personality_jp = personality_str[3] == "J"
