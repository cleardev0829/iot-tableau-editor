export const loadJSONFile = (file, store) => {
  var reader = new FileReader();
  reader.onloadend = function () {
    var text = reader.result;
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      alert("Can not load the project.");
    }

    if (json) {
      store.loadJSON(json);
    }
  };
  reader.onerror = function () {
    alert("Can not load Polotno project file.");
  };
  reader.readAsText(file);
};

export const loadImageFile = (file, store) => {
  var reader = new FileReader();
  reader.onloadend = function () {
    var url = reader.result;
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const scale = Math.min(
        1,
        store.width / img.width,
        store.height / img.height
      );
      store.activePage.addElement({
        type: "image",
        width: img.width * scale,
        height: img.height * scale,
        src: url,
      });
    };
  };
  reader.onerror = function () {
    alert("Can not load image.");
  };
  reader.readAsDataURL(file);
};

export const loadFile = (file, store) => {
  if (file.type.indexOf("image") >= 0) {
    loadImageFile(file, store);
  } else {
    loadJSONFile(file, store);
  }
};

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export function dataURItoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const blob = new Blob([u8arr], { type: mime });
  return blob;
}

export function base64toPDF(data) {
  var bufferArray = base64ToArrayBuffer(data);
  var blobStore = new Blob([bufferArray], { type: "application/pdf" });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blobStore);
    return;
  }
  var data = window.URL.createObjectURL(blobStore);
  var link = document.createElement("a");
  document.body.appendChild(link);
  link.href = data;
  link.download = "file.pdf";
  link.click();
  window.URL.revokeObjectURL(data);
  link.remove();
}

function base64ToArrayBuffer(data) {
  var bString = window.atob(data);
  var bLength = bString.length;
  var bytes = new Uint8Array(bLength);
  for (var i = 0; i < bLength; i++) {
    var ascii = bString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
