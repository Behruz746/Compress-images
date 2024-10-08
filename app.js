let w = 500;
let image_type = "png";
let input = document.querySelector("#input");

function dropImage(e) {
  let img_file = e.target.files[0];

  console.log(e);
  console.log(img_file);

  let reader = new FileReader();
  reader.readAsDataURL(img_file);

  reader.onload = (event) => {
    let img_url = event.target.result;
    let imgEl = document.createElement("img");

    imgEl.src = img_url;

    imgEl.onload = (e) => {
      let canvas = document.createElement("canvas");
      let ratio = w / e.target.width;

      canvas.width = w;
      canvas.height = e.target.height * ratio;

      let context = canvas.getContext("2d");

      context.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
      let new_img_url = context.canvas.toDataURL(`image/${image_type}`, 90);

      let new_imgEl = document.createElement("img");
      new_imgEl.src = new_img_url;

      document.getElementById("wrapper").appendChild(new_imgEl);

      // image size and url
      console.log(new_img_url);
      console.log(e.target.width, "x", +(e.target.height * ratio).toFixed());
    };

    document.getElementById("wrapper").appendChild(imgEl);
  };
}

input.addEventListener("change", dropImage);
