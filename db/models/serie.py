from sqlalchemy import String, BigInteger
from sqlalchemy.orm import relationship, Mapped, mapped_column
from .base import Base

class Serie(Base):
    __tablename__ = 'serie'
    id = mapped_column(BigInteger(),primary_key=True)
    name = mapped_column(String(200), nullable=False)
    image = mapped_column(String(200), nullable=False)
    personajes = relationship("Character", back_populates="serie")