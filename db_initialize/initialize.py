from sqlalchemy import create_engine
from db.models import Base
from threading import Timer
from db.models import Serie, Character


def initialize_retry():
    print("Initialize retry")
    try:
        return initialize()
    except Exception as e:
        print("Initialize retry: Exception: ", e)
        tim = Timer(10, initialize_retry)
        tim.start()
        tim.join()


def initialize():
    engine = create_engine('mysql://bloom:bloomPass@mysql/winxclub', echo=True)
    Base.metadata.create_all(bind=engine)
    return engine


if __name__ == '__main__':
    print("Initialize __main__")
    tim = Timer(10, initialize_retry)
    tim.start()
    tim.join()
    print("Initialize __main__ end")
