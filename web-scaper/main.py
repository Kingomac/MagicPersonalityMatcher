from .scraped_types import ScrapedCharacter, ScrapedSerie
from db.models import Character, Serie
from sqlalchemy.orm import Session
from db_initialize import initialize_retry


def save_scraped(scraped_serie: ScrapedSerie, scraped_characters: list[ScrapedCharacter]):
    """
    Save the scraped data into the database
    """

    # Get execution
    engine = initialize_retry()
    # Create SQLAlchemy Session
    with Session(engine) as session:
        # Create Serie
        serie = Serie(name=scraped_serie["name"], image=scraped_serie["image"])
        session.add(serie)
        session.commit()
        # Create Characters
        session.add_all(
            [Character(name=x["name"], image=x["image"], personality_str=x["personality"],
                       serie=serie) for x in scraped_characters]
        )
        session.commit()
