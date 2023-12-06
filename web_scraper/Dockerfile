FROM python:3

WORKDIR /usr/src/app

RUN apt update && apt install -y firefox-esr wget zip
RUN pip install --no-cache-dir requests selenium sqlalchemy mysqlclient python-slugify

CMD ["python", "-m", "web_scraper.scrape_to_db"]