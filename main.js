
window.addEventListener('load', () => {
  document.getElementById('imageUploadInput').addEventListener('change', function () {
    if (this.files && this.files[0]) {
      let previewImg = document.getElementById('img');
      previewImg.onload = () => {
        URL.revokeObjectURL(previewImg.src);
        previewImg.src = URL.createObjectURL(this.files[0]);
      }

      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      let originalImg = new Image();
      let frameImg = new Image();
      
      originalImg.src = URL.createObjectURL(this.files[0]);
      
      function cropImage(url, aspectRatio) {
        return new Promise((resolve) => {
          const inputImage = new Image();
      
          inputImage.onload = () => {
            const inputWidth = inputImage.naturalWidth,
            inputHeight = inputImage.naturalHeight;
      
            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;
      
            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > aspectRatio) {
              outputWidth = inputHeight * aspectRatio;
            } else if (inputImageAspectRatio < aspectRatio) {
              outputHeight = inputWidth / aspectRatio;
            }
      
            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * 0.5;
            const outputY = (outputHeight - inputHeight) * 0.5;
      
            // create a canvas that will present the output image
            const outputImage = document.createElement("canvas");      
            outputImage.width = outputWidth;
            outputImage.height = outputHeight;
            
      
            const ctx = outputImage.getContext("2d");
            ctx.drawImage(inputImage, outputX, outputY);

            resolve([ outputImage, inputImage ]);
          };
          inputImage.src = url;
        });
      }

      
      originalImg.addEventListener("load", () => {
        try {
          const w = canvas.width, h = canvas.height, imgW = originalImg.width;
          if(originalImg.height > 1000) {
            ctx.drawImage(originalImg, 0, 0, w, originalImg.height);
            console.log(originalImg.height);
          } else if(imgW > 1000) {
            ctx.drawImage(originalImg, 0, 0, w, h);
          }
           else if (imgW > 700 && imgW <= 720){
            ctx.drawImage(originalImg, (imgW - (w / 2)) / 2, 0);
          } else {
            ctx.drawImage(originalImg, 0, 0, w, h);
          }

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
  });
});


const selectResolution = document.querySelector("#selectResolution"),
canvas = document.querySelector("#canvas");

selectResolution.addEventListener("change", () => {
  canvas.width = selectResolution.value;
  canvas.height = selectResolution.value;
});
