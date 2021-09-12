
window.addEventListener('load', () => {
  document.getElementById('imageUploadInput').addEventListener('change', function () {
    if (this.files && this.files[0]) {
      let img = document.getElementById('img');
      img.onload = () => {
        URL.revokeObjectURL(img.src);
      }

      img.src = URL.createObjectURL(this.files[0]);

      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      let originalImg = new Image();
      let frameImg = new Image();
      originalImg.src = URL.createObjectURL(this.files[0]);

      originalImg.onload = () => {
        let w = 250, h = 150;
        ctx.drawImage(originalImg, 0, 0, w, h);
        frameImg.src = "./img/frame.png";
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, w, h);

          let img = canvas.toDataURL("image/png");
          document.write('<img src="' + img + '" width="200" height="200"/>');
        }
      }
    }
  });
});
