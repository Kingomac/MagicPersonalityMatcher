from sqlalchemy import create_engine, Column, Integer, String, Sequence, Boolean, ForeignKey
from models.base import Base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///mysql.winxclub', echo=True)
Base.metadata.create_all(bind=engine)
