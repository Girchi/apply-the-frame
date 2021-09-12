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

      originalImg.onload = () => {
        try {
          const w = canvas.width, h = canvas.height;
          ctx.drawImage(originalImg, 0, 0, w, h);
          frameImg.src = "./img/frame.png";
          frameImg.onload = () => {
            ctx.drawImage(frameImg, 0, 0, w, h);
            
            let img = canvas.toDataURL("image/jpg", 1.0);
            document.write(`
            <style>
              .generatedContainer {
                align-items: center;
                margin: 180px auto;
                width: max-content;
              }
              p {
                font-family: sans-serif;
              }
            </style>
            <div class='generatedContainer'>
              <p>დააკლიკე გადმოსაწერად</p>
              <a href="${img}" download>
                <img class='generatedImg' src="${img}" width="200" height="150"/>
              </a>
            </div>
            `);
          }
        } catch(err) {
          console.log("Something went wrong:\n", err);
        }
      }
    }
  });
});


const selectResolution = document.querySelector("#selectResolution"),
canvas = document.querySelector("#canvas");

selectResolution.addEventListener("change", () => {
  canvas.width = selectResolution.value;
  canvas.height = selectResolution.value;
})