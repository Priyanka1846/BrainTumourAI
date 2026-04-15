const fileInput = document.getElementById("fileInput");
const predictBtn = document.getElementById("predictBtn");
const preview = document.getElementById("preview");
const resultDiv = document.getElementById("result");

let selectedFile = null;

// File select
fileInput.addEventListener("change", (e) =>
{
    console.log("FILE EVENT TRIGGERED");
    selectedFile = e.target.files[0];

    if (selectedFile)
    {
        predictBtn.disabled = false;

        const imageURL = URL.createObjectURL(selectedFile);

    preview.onload = () =>
    {
        URL.revokeObjectURL(imageURL); // cleanup
    };

    preview.src = imageURL;
    preview.style.display = "block";

        document.getElementById("fileName").innerText = selectedFile.name;
    }
});

// Predict
predictBtn.addEventListener("click", async () =>
{
    if (!selectedFile)
    {
        alert("Please select an image first");
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    resultDiv.style.display = "block";
    resultDiv.innerHTML = "⏳ Predicting...";

    try
    {
        const response = await fetch("http://127.0.0.1:8000/predict",
        {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        // 🔥 SHOW RIGHT PANEL
        const panel = document.getElementById("insightPanel");

        panel.style.display = "flex";

        setTimeout(() =>
        {
            panel.classList.add("show");
        }, 50);

        document.getElementById("insightClass").innerText = data.class.toUpperCase();
        document.getElementById("insightConfidence").innerText =
            (data.confidence * 100).toFixed(2) + "%";

        // 🧠 Risk logic
        let risk = "Low";
        let desc = "No significant abnormality detected.";

        if (data.class !== "no_tumor")
        {
            risk = data.confidence > 0.85 ? "High" : "Moderate";
            desc = "Model detected abnormal tissue patterns consistent with tumor characteristics.";
        }

        document.getElementById("insightRisk").innerText = risk;
        document.getElementById("insightDesc").innerText = desc;

        console.log("RESPONSE:", data);

        // ✅ ONLY prediction (no gradcam now)
        resultDiv.innerHTML = `
            <div class="result-title">${data.class.toUpperCase()}</div>
    
            <div style="margin-top:8px; opacity:0.7;">
                Confidence: ${(data.confidence * 100).toFixed(2)}%
            </div>

            <div class="bar">
            <div class="bar-fill" id="barFill"></div>
            </div>
        `;
        resultDiv.style.display = "block";
        const bar = document.getElementById("barFill");

        setTimeout(() =>
        {
            bar.style.width = (data.confidence * 100) + "%";

            // 🎨 Dynamic color based on tumor type
            if (data.class === "glioma")
            {
                bar.style.background = "#ff4d6d";
            }
            else if (data.class === "meningioma")
            {
                bar.style.background = "#4cc9f0";
            }
            else if (data.class === "pituitary")
            {
                bar.style.background = "#f72585";
            }
            else
            {
                bar.style.background = "#22c55e";
            }

        }, 100);

        const preview = document.getElementById("preview");

        if (data.class === "glioma")
        {
            preview.style.boxShadow = "0 0 40px rgba(255,77,109,0.6)";
        }
        else if (data.class === "meningioma")
        {
                preview.style.boxShadow = "0 0 40px rgba(76,201,240,0.6)";
        }
        else if (data.class === "pituitary")
        {
            preview.style.boxShadow = "0 0 40px rgba(247,37,133,0.6)";
        }
        else
        {
            preview.style.boxShadow = "0 0 40px rgba(34,197,94,0.6)";
        }
    }
    catch (error)
    {
        console.error("ERROR:", error);

        resultDiv.innerHTML = "❌ Error connecting to backend";
    }
});