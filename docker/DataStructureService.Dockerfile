# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update && apt-get install -y gcc python3-dev musl-dev libpq-dev

# Set working directory
WORKDIR /app

# Add requirements
COPY requirements.txt /app/requirements.txt

# Install pip dependencies
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Add the rest of the code
COPY . /app

# Expose port
EXPOSE 5000

# Run the application:
CMD ["flask", "run", "--host=0.0.0.0"]
