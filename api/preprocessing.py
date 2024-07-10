import onnxruntime as ort
import numpy as np
import cv2
import io
from fastapi import HTTPException, UploadFile


def process_uploaded_image(upload_file: UploadFile) -> np.ndarray:
    # 1. Check if the file has a supported image extension
    file_extension_valid = upload_file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not file_extension_valid:
        raise HTTPException(status_code=415, detail="Unsupported file provided.")

    # 2. Transform raw image into a CV2 image
    # Read image as a stream of bytes
    image_stream = io.BytesIO(upload_file.file.read())

    # Start the stream from the beginning (position zero)
    image_stream.seek(0)

    # Write the stream of bytes into a numpy array
    file_bytes = np.asarray(bytearray(image_stream.read()), dtype=np.uint8)

    # Decode the numpy array as an image
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # return numpy array as an image
    return image


def detect_objects(onnx_outputs, original_img, img_shape=800, conf_threshold=0.5, nms_threshold=0.2,
                   class_names=None):
    if class_names is None:
        class_names = ['Caries', 'Deep Caries', 'Impacted', 'Periapical Lesion']

    # Get the output from the ONNX model
    output = onnx_outputs[0][0].transpose()

    # Initialize lists to store information about detected objects
    bounding_boxes = []
    class_indexes = []
    confidence_values = []

    img_height, img_width, _ = original_img.shape

    # Iterate through each detection in the output
    for detection in output:
        prob_scores = detection[4:]
        class_index = np.argmax(prob_scores)
        confidence = prob_scores[class_index]

        # Check if confidence is above the threshold
        if confidence >= conf_threshold:
            xc, yc, w, h = detection[:4]

            # Calculate bounding box coordinates in the original image space
            x1 = int((xc - w / 2) / img_shape * img_width)
            y1 = int((yc - h / 2) / img_shape * img_height)
            x2 = int((xc + w / 2) / img_shape * img_width)
            y2 = int((yc + h / 2) / img_shape * img_height)

            # Store information about the detected object
            bounding_boxes.append([x1, y1, x2, y2])
            class_indexes.append(class_index)
            confidence_values.append(float(confidence))

    # Apply non-maximum suppression to remove overlapping bounding boxes
    indices = cv2.dnn.NMSBoxes(bounding_boxes, confidence_values, conf_threshold, nms_threshold)

    # Process the detected objects
    for i in indices:
        box = bounding_boxes[i]  # Access the bounding box using the index
        x1, y1, x2, y2 = box
        label = f"{class_names[class_indexes[i]].upper()} {confidence_values[i]:.2f}"  # Include confidence score
        # Draw bounding box and label
        cv2.rectangle(original_img, (x1, y1), (x2, y2), (255, 0, 0), 2)
        cv2.putText(original_img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    return original_img


def preprocess_image_for_onnx(bgr_image, target_shape=800):

    # Convert the image to RGB format
    rgb_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2RGB)

    # Convert the RGB image to float32
    input_image = np.array(rgb_image, dtype="float32")

    # Resize the image to the target shape
    resized_image = cv2.resize(input_image, (target_shape, target_shape))

    # Transpose the image to match the model's input format (channels first)
    transposed_image = resized_image.transpose(2, 0, 1)

    # Resize and reshape the image to match the expected model input shape
    reshaped_image = np.resize(transposed_image, new_shape=(1, 3, target_shape, target_shape))

    # Normalize the image by scaling pixel values to the range [0, 1]
    normalized_image = reshaped_image / 255.0

    return normalized_image


def load_onnx_model(onnx_path):
    # Load the ONNX model with error handling
    try:
        model = ort.InferenceSession(onnx_path, providers=['CPUExecutionProvider'])

        return model
    except Exception as e:
        raise Exception(f"Error loading ONNX model: {str(e)}")

