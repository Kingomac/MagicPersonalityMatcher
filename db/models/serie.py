from sqlalchemy import String
from base import Base
from sqlalchemy.orm import relationship, Mapped, mapped_column

class Serie(Base):
    __tablename__ = 'serie'
    id = mapped_column(primary_key=True)
    name = mapped_column(String(200), nullable=False)
    image = mapped_column(String(200), nullable=False)
    personajes = relationship("Character", back_populates="serie")