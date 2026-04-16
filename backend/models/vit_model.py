import torch
import torch.nn as nn
from pathlib import Path
from PIL import Image
from torchvision import transforms
import timm

# Global variables
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = None
transform = None

# Model classes
CLASS_NAMES = ["glioma", "meningioma", "pituitary", "no_tumor"]


def create_vit_model(num_classes: int):
    model = timm.create_model("vit_base_patch16_224", pretrained=True)
    model.head = nn.Linear(model.head.in_features, num_classes)
    return model


def load_model(model_path: str):
    global model, transform

    num_classes = len(CLASS_NAMES)
    model = create_vit_model(num_classes).to(device)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5]),
    ])


def run_inference(image: Image.Image) -> dict:
    global model, transform

    if model is None:
        model_path = Path(__file__).parent.parent / "trained" / "best_vit_model.pth"
        load_model(str(model_path))

    img_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(img_tensor)
        probs = torch.softmax(output, dim=1)[0]
        pred_idx = int(torch.argmax(probs).item())
        confidence = float(probs[pred_idx].item())

    return {
        "class": CLASS_NAMES[pred_idx],
        "confidence": confidence
    }