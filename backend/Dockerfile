FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

CMD python -m uvicorn backend:app --host 0.0.0.0 --port 8000