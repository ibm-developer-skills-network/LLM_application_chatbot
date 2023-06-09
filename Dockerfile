FROM tiangolo/uwsgi-nginx-flask:python3.8
ENV LISTEN_PORT 8501
EXPOSE 8501
COPY . .
