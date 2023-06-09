# specify the parent image from which we build
FROM python:3.10

# set the working directory
WORKDIR /LLM_application_chatbot

# install the dependencies and packages in the requirements file
RUN pip install -r requirements.txt

# copy every content from the local file to the image
COPY . /LLM_application_chatbot

# inform Docker that the container listens on the specified network ports at runtime.
EXPOSE 8501

# configure the container to run in an executed manner
CMD ["python", "app.py"]
