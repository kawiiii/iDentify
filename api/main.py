from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import cv2
from preprocessing import *
import onnxruntime as ort
import io
import base64

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify specific origins instead of '*'
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

onnx_path = "models/dentex_onnx.onnx"

try:
    onnx_model = ort.InferenceSession(onnx_path, providers=['CPUExecutionProvider'])
except Exception as e:
    raise Exception(f"Error loading ONNX model: {str(e)}")


@app.get("/")
async def homepage():
    return "Hello, This is dental application"


@app.post("/predict/")
async def upload_image(file: UploadFile = File(...)):
    imgBGR = process_uploaded_image(file)
    inputImg = preprocess_image_for_onnx(bgr_image=imgBGR)
    modelOutputs = onnx_model.run(["output0"], {"images": inputImg})
    annotatedImg, labels = detect_objects(onnx_outputs=modelOutputs, original_img=imgBGR)
    _, img_encoded = cv2.imencode('.jpeg', annotatedImg)
    img_bytes = img_encoded.tobytes()
    img_base64 = base64.b64encode(img_bytes).decode('utf-8')
    
    response_data = {
        "image": img_base64,
        "labels": labels
    }

    return JSONResponse(content=response_data, media_type="application/json")

