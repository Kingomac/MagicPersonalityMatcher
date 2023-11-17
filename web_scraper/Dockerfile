FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN apt update && apt install -y firefox-esr wget zip
RUN pip install --no-cache-dir -r requirements.txt

COPY ./web_scraper ./web_scraper
COPY ./db ./db
COPY ./db_initialize ./db_initialize

CMD ["python", "-m", "web_scraper.scrape_to_db"]