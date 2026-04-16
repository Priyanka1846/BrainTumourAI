# 🧠 Brain Tumor Detection using Vision Transformer (ViT)

An AI-powered web application that detects brain tumors from MRI scans using a Vision Transformer (ViT) model. The system provides real-time predictions along with confidence scores and risk levels through an interactive UI.

---

## 🚀 Features

* 🧠 Brain tumor classification (Pituitary, Meningioma, No Tumor)
* ⚡ Fast inference using trained ViT model
* 📊 Confidence score visualization
* 🎯 Risk level indication (Low / High)
* 🖼️ MRI image preview before prediction
* 🎨 Dynamic UI with color-coded outputs
* 🌐 Full-stack integration (Frontend + Backend)

---

## 🏗️ Tech Stack

### 🔹 Frontend

* HTML, CSS, JavaScript
* Responsive UI design
* Dynamic result rendering

### 🔹 Backend

* Python
* FastAPI (for API handling)
* PyTorch (for model inference)

### 🔹 Model

* Vision Transformer (ViT)
* Trained on MRI brain tumor dataset
* Saved as `.pth` model file

---

## 📂 Project Structure

```
BrainTumourAI/
│
├── backend/
│   ├── main.py              # FastAPI server
│   ├── models/
│   │   └── vit_model.py     # Model architecture
│   ├── trained/
│   │   └── best_vit_model.pth  # Trained weights
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   └── src/
│       └── main.js
│
└── README.md
```

---

## ⚙️ How It Works

1. User uploads an MRI image
2. Image is sent to backend API
3. Model processes the image
4. Prediction is returned:

   * Tumor type
   * Confidence score
   * Risk level
5. UI updates dynamically with results

---

## 🧪 API Endpoint

```
POST /predict
```

### Request:

* Form-data with MRI image

### Response:

```json
{
  "prediction": "MENINGIOMA",
  "confidence": 99.8
}
```

---

## 💻 Run Locally

### 🔹 Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 🔹 Frontend

Open `index.html` in browser

---

## 🌐 Deployment

* Frontend can be deployed using Netlify / Vercel
* Backend deployed using Railway / Render

---

## 📈 Future Improvements

* Add Grad-CAM visualization for explainability
* Support more tumor classes
* Improve UI responsiveness
* Add user authentication & history tracking

---

## 🎯 Use Case

* Assists in early tumor detection
* Educational demo for AI in healthcare
* Portfolio project for ML + Fullstack integration

---

## 👩‍💻 Author

**Priyanka K**

* AI & Full Stack Developer
* Passionate about healthcare AI solutions

---

## ⭐ Acknowledgement

This project is built for learning and demonstration purposes and is not intended for medical diagnosis.

---
