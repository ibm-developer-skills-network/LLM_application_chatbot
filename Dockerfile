# Specify the parent image from which we build
FROM python:3.10

# Set the working directory
WORKDIR /LLM_application_chatbot

# This copies the requirements.txt file from the local directory to the current directory (.) in the container
COPY requirements.txt .

# Install the dependencies and packages in the requirements file
RUN pip install -r requirements.txt

# Copy every content from the local file to the image
COPY . .

# This informs Docker that the container will listen on port 5000 at runtime.
EXPOSE 5000

# configure the container to run in an executed manner
CMD ["python", "app.py"]
