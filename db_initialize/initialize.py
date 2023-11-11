from sqlalchemy import create_engine, Column, Integer, String, Sequence, Boolean, ForeignKey
from db.models import Base
from sqlalchemy.orm import sessionmaker

def initialize():
    engine = create_engine('mysql://bloom:bloomPass@mysql/winxclub', echo=True)
    Base.metadata.create_all(bind=engine)

if __name__ == '__main__':
    initialize()