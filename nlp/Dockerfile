FROM python:3.11-slim
COPY . /usr/nlp
WORKDIR /usr/nlp
RUN pip install -r requirements.txt
EXPOSE 5004
CMD ["python3","src/app.py"]