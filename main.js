import './croppie/croppie.js'

function handleCrop(imageSrc) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let originalImg = new Image();
  let frameImg = new Image();
  
  originalImg.src = imageSrc;
  
  originalImg.addEventListener("load", () => {
    try {
      const w = canvas.width, h = canvas.height;
      ctx.drawImage(originalImg, 0, 0, w, h);

      frameImg.src = "./img/frame.png";
      frameImg.onload = () => {
        ctx.drawImage(frameImg, 0, 0, w, h);
        
        let img = canvas.toDataURL("image/png", 1.0);
        document.write(`
        <style>
        .generatedContainer {
            align-items: center;
            margin: 180px auto;
            width: max-content;
          }
          .generatedImg {
            width: 300px;
            height: 300px;
          }
          p {
            font-family: sans-serif;
          }
        </style>
        
        <div class='generatedContainer'>
        <p>დააკლიკე გადმოსაწერად</p>
          <a href="${img}" download>
            <img class='generatedImg' src="${img}">
            </a>
        </div>
        `);
      }
    } catch(err) {
      console.log("Something went wrong:\n", err);
    }
  })
}

// Manually changing image resolution. Default: 1000x1000
const selectResolution = document.querySelector("#selectResolution"),
canvas = document.querySelector("#canvas");

selectResolution.addEventListener("change", () => {
  canvas.width = selectResolution.value;
  canvas.height = selectResolution.value;
});

// Load croppie
window.addEventListener('load', () => {
  document.getElementById('imageUploadInput').addEventListener('change', function () {

    if (this.files && this.files[0]) {
      let previewImg = document.getElementById('img');
      previewImg.onload = () => {
        URL.revokeObjectURL(previewImg.src);
        let imgDiv = document.getElementById('cropImage');
        imgDiv.style.display = 'block';
        imgDiv.style.textAlign = 'center';

        // Submit button
        const btn = document.createElement("button");
        btn.textContent = 'გენერაცია';
        btn.id = 'btn';
        btn.style.marginBottom = "100px";


        let croppie = new Croppie(imgDiv, {
          enableExif: true,
          viewport: { width: 400, height: 400, type: 'circle' },
          boundary: { width: 450, height: 450 }
        });

        croppie.bind({
          url: previewImg.src
        });
        imgDiv.append(btn);

        // Add a frame to the cropped image
        document.getElementById('btn').addEventListener('click', () => {
          croppie.result('canvas', 'original').then((src) => { handleCrop(src); });
        })  
      }
      previewImg.src = URL.createObjectURL(this.files[0]);
    }
  })
})
