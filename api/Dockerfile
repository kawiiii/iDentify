# Use a base image with the required Python version
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install system dependencies
# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libjpeg-dev \
    zlib1g-dev \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the api/ directory into the container
COPY . /app/

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your FastAPI app is running on
EXPOSE 8000

# Set the command to run your FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]