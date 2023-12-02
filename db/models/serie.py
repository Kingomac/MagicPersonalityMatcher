from typing import List
from sqlalchemy import String, BigInteger
from sqlalchemy.orm import relationship, Mapped, mapped_column
from .base import Base


class Serie(Base):
    __tablename__ = 'serie'
    id: Mapped[int] = mapped_column(
        BigInteger(), primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    image: Mapped[str] = mapped_column(String(200), nullable=False)
    # Relationship one to many with characters (this is parent)
    characters: Mapped[List["Character"]] = relationship(
        back_populates="serie", passive_deletes='all')