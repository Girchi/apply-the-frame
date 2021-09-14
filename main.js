import './croppie/croppie.js'

function call(imageSrc) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let originalImg = new Image();
  let frameImg = new Image();
  
  originalImg.src = imageSrc;
  
  originalImg.addEventListener("load", () => {
    try {
      const w = canvas.width, h = canvas.height, imgW = originalImg.width;
      // if(originalImg.height > 1000) {
      //   ctx.drawImage(originalImg, 0, 0, w, originalImg.height);
      //   console.log(originalImg.height);
      // } else if(imgW > 1000) {
      //   ctx.drawImage(originalImg, 0, 0, w, h);
      // } else if (imgW > 700 && imgW <= 720){
      //   ctx.drawImage(originalImg, (imgW - (w / 2)) / 2, 0);
      // } else {
      // }
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


// Croppie
window.addEventListener('load', () => {
  document.getElementById('imageUploadInput').addEventListener('change', function () {

    if (this.files && this.files[0]) {
      let previewImg = document.getElementById('img');
      previewImg.onload = () => {
        URL.revokeObjectURL(previewImg.src);
        let imgDiv = document.getElementById('imgcont');

        let vanilla = new Croppie(imgDiv, {
          enableExif: true,
          viewport: { width: 200, height: 200, type: 'circle' },
          boundary: { width: 300, height: 300 }
        });

        vanilla.bind({
          url: previewImg.src
        });


        const btn = document.getElementById('btn');
        const canvas = document.getElementById("firstCanvas");
        const ctx = canvas.getContext("2d");
        btn.addEventListener('click', () => {
          vanilla.result('canvas', 'original').then((src) => { call(src); });
        })  
      }
      previewImg.src = URL.createObjectURL(this.files[0]);
    }
  })
})
