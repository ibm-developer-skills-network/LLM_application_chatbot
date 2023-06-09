FROM python:3.10

WORKDIR /LLM_application_chatbot
COPY . .

RUN pip install -r requirements.txt

CMD ["python", "-u", "app.py"]
