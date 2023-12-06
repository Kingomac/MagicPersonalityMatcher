from sqlalchemy import Engine
from .scraped_types import ScrapedCharacter, ScrapedSerie
from db.models import Character, Serie
from sqlalchemy.orm import Session, sessionmaker
from db_initialize import initialize_retry
from .scrape import scrape


def save_scraped(session: Session, scraped_serie: ScrapedSerie, scraped_characters: list[ScrapedCharacter]):
    """
    Save the scraped data into the database
    """
    # Create Serie
    serie = Serie(name=scraped_serie["name"], image=scraped_serie["image"])
    session.add(serie)
    # Create Characters and associate them with the serie
    print("SCRAPED CHARACTERS: ", scraped_characters)
    for x in scraped_characters:
        character = Character(
            name=x["name"], image=x["image"], personality_str=x["personality"], serie=serie)
        session.add(character)
    session.commit()


def scrape_to_db():
    # Initialize database
    print("SCRAPING TO DB")
    engine = initialize_retry()
    session = sessionmaker(bind=engine)
    # Get series from links.txt
    with open("web_scraper/links.txt", "r") as f:
        links = f.read().splitlines()
    print("READ LINKS: ", links)
    # Scrape each serie
    for link in links:
        scraped_serie, scraped_characters = scrape(link)
        ss = session()
        save_scraped(ss, scraped_serie, scraped_characters)


if __name__ == "__main__":
    print("pollllllllaaaaaaaaaaaaaaaaaaaaaaaaaaas")
    try:
        scrape_to_db()
    except Exception as e:
        print("ERROR: ", e)
        print(e.with_traceback())
