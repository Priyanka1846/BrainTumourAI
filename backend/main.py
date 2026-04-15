from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

# 🔥 Import your inference function
from models.vit_model import run_inference

app = FastAPI()

# ✅ CORS (VERY IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Root check (optional)
@app.get("/")
def home():
    return {"message": "Brain Tumor Detection API is running 🚀"}


# 🔥 Prediction API
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()

    # Convert to PIL image
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    # 🔥 Call your model logic
    result = run_inference(image)

    return result