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
            document.write(`<img src="${img}" width="200" height="150"/><a href="${img}" download><button>გადმოწერა</button></a>`);
          }
        } catch(err) {
          console.log("Something went wrong:\n", err);
        }
      }
    }
  });
});
