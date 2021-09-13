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
      
      originalImg.addEventListener("load", () => {
        try {
          const w = canvas.width, h = canvas.height, imgW = originalImg.width;
          if(imgW > 1000) {
              ctx.drawImage(originalImg, 0, 0, w, h);
          } else if (imgW > 700 && imgW <= 720){
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
                width: 200px;
                height: 150px;
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
