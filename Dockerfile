FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

COPY app.py ./
RUN pip install --no-cache-dir pymongo
