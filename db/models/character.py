from sqlalchemy import create_engine, Column, Integer, String, Sequence, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import mapped_column,relationship

Base = declarative_base()

class Character(Base):
    __tablename__ = 'character'
    id = mapped_column(primary_key=True)
    name = mapped_column(String(200), nullable=False)
    image = mapped_column(String(200), nullable=False)
    serie_id = mapped_column(ForeignKey('serie.id'), nullable=False)
    serie = relationship("Serie", back_populates="characters")
    personality_ie = mapped_column(Boolean(), nullable=False) # True = I, False = E
    personality_sn = mapped_column(Boolean(), nullable=False) # True = S, False = N
    personality_tf = mapped_column(Boolean(), nullable=False) # True = T, False = F
    personality_jp = mapped_column(Boolean(), nullable=False) # True = J, False = P
