import myImage from "./images/sleep.png";
const img = document.createElement("img");
img.src = myImage;

chrome.runtime.onMessage.addListener((message, sender, sendRequest) => {
  sendRequest("Dom操作します！");
  if (message.res === true) {
    const html = document.getElementsByTagName("html");
    const hateDiv = document.createElement("div");
    hateDiv.appendChild(img);
    hateDiv.style.width = "100%";
    hateDiv.style.height = "100%";
    hateDiv.style.backgroundColor = "#F9E5CB";
    hateDiv.id = "hate";
    html[0].appendChild(hateDiv);
    document.head.insertAdjacentHTML("beforeend", hateDivStyle);
  }
});

const hateDivStyle = `
<style>
#hate {
  position: fixed;
  top: 0;
  z-index: 10;
  text-align:center;
}

h1 {
  font-size:40px;
  font-weight:bold;
  position:relative;
  top:50%
}
</style>
`;
