# iDentify: Dental Anomaly Detection using YOLOv9 with Data Augmentation

## Overview
iDentify is a web-based application designed to facilitate the detection and classification of dental anomalies from panoramic X-rays. The tool consists of two main components: a React Vite-based front-end application and a backend system incorporating a trained YOLOv9-c model wrapped in a FastAPI container.

![Inference on Panoramic X-ray](https://www.minthilldentistry.com/wp-content/uploads/panoramic-x-ray-thegem-blog-default.jpg)

## Features
### Front-End
The frontend is built using React Vite, a modern web development framework that allows for efficient and scalable development. The application offers several functionalities, including:
- Welcome page
- Sign-up and login (using Firebase Authentication)
- Dashboard for image upload, result viewing, zoom feature, and PDF export
- Feedback page for model performance feedback

### Back-End
The backend is a FastAPI application responsible for:
- Receiving and processing image data
- Running the detection algorithm
- Returning the results along with confidence scores for each classification of dental anomalies (Caries, Deep caries, Periapical lesion, and Impacted tooth)

## Setup Instructions
### Backend (FastAPI)
You have two options to run the backend:

1. **Using Docker:**
   Pull the Docker image from Docker Hub and run it:
     ```sh
     docker pull kanwalmehreen/identifyapp:latest
     docker run -p 8000:8000 kanwalmehreen/identifyapp:latest
     ```

2. **Running Locally:**
   1. Clone the repository:
      ```sh
      git clone https://github.com/kawiiii/iDentify.git
      cd iDentify/api
      ```
   2. Create a virtual environment:
      ```sh
      python -m venv venv
      ```
   3. Activate the virtual environment:
      - On Windows:
        ```sh
        venv\Scripts\activate
        ```
      - On macOS and Linux:
        ```sh
        source venv/bin/activate
        ```
   4. Install dependencies:
      ```sh
      pip install -r requirements.txt
      ```
   5. Download the model from [Google Drive](https://drive.google.com/file/d/1jEcy-nDyPqKAsz2XaSz9VInwbp8q6P7L/view?usp=sharing) and place it in the `api/models` directory.
   6. Run the backend:
      ```sh
      uvicorn main:app --reload
      ```
You can access the backend at [http://0.0.0.0:8000](http://0.0.0.0:8000). Press `CTRL+C` to quit.

### Frontend (React Vite)
   1. Clone the repository if you haven't already.
   2. Copy the .env.example file to create a new .env file:
      ```sh
      cp .env.example .env
      ```
      Fill in the Firebase keys and any other required environment variables in the newly created .env file.
   3. Install the dependencies:
      ```sh
      npm install
      ```
   4. Run the frontend development server:
      ```sh
      npm run dev
      ```
Once the development server is running, you can access the frontend application at [http://localhost:5174/ ](http://localhost:5174/).


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributors

- **Kanwal Mehreen** - Technical Editor & ML Researcher (Email: kmehreen.bese20seecs@seecs.edu.pk)
- **Hassan Aqeel Khan** - Senior Lecturer, Applied AI & Robotics (Email: h.khan54@aston.ac.uk)
