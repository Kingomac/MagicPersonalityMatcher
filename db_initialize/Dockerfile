FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./db_initialize ./db_initialize
COPY ./db ./db

CMD ["python", "-m", "db_initialize.initialize"]