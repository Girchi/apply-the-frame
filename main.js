import './croppie/croppie.js';

// Detect if user is using Safari browser
let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

window.open("googlechrome://navigate?url=https://girchi.github.io/apply-the-frame/" + url,"_system")
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

        if(isSafari) {
          document.write(`
          <style>
          @import "./cropped.css"
          </style>
          
          <div class='generatedContainer'>
          <p>დააკლიკე ფოტოს გასახსნელად</p>
            <a href="${img}" download="FramedImage">
              <img class='generatedImg' src="${img}">
              </a>
          </div>
          `);
        } else {
          document.write(`
          <style>
          @import "./cropped.css"
          </style>
          
          <div class='generatedContainer'>
          <p>დააკლიკე ფოტოს გადმოსაწერად</p>
            <a href="${img}" download>
              <img class='generatedImg' src="${img}">
              </a>
          </div>
          `);
        }
        
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
      previewImg.addEventListener("load", () => {
        // URL.revokeObjectURL(previewImg.src);
        let imgDiv = document.getElementById('cropImage');
        imgDiv.style.display = 'table';
        imgDiv.style.margin = '0 auto';
        imgDiv.style.textAlign = 'center';

        // Submit button
        const btn = document.createElement("button");
        btn.textContent = 'გენერაცია';
        btn.id = 'btn';


        let croppie = new Croppie(imgDiv, {
          enableExif: true,
          viewport: { width: 320, height: 320, type: 'square' },
          boundary: { width: 450, height: 450 }
        });

        croppie.bind({
          url: previewImg.src
        });
        // Add Submit button
        imgDiv.append(btn);

        // Add a frame to the cropped image
        document.getElementById('btn').addEventListener('click', () => {
          
          let imageSize = {
            width: 1000,
            height: 1000,
            type: "square"
          }

          croppie.result({type: 'canvas', size: imageSize, format: 'png', quality: 1, circle: false})
          .then((src) => { handleCrop(src); });
        })  
      });
      previewImg.src = URL.createObjectURL(this.files[0]);
    }
  })
  document.getElementById('imageUploadInput').value = null;
})
