chrome.runtime.onMessage.addListener((message, sender, sendRequest) => {
  sendRequest("Dom操作します！");
  if (message.res === true) {
    const html = document.getElementsByTagName("html");
    const hateDiv = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerHTML = "邪魔させてもらいます";
    hateDiv.appendChild(h1);
    hateDiv.style.width = "100%";
    hateDiv.style.height = "100%";
    hateDiv.style.backgroundColor = "#00A0E9";

    hateDiv.id = "hate";
    html[0].appendChild(hateDiv);

    document.head.insertAdjacentHTML("beforeend", hateDivStyle);

    // alert("Dom操作！");
  } else {
    alert("Dom操作なし");
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
