document.body.style.backgroundColor = "orange";

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message.isURL);
//   sendResponse("backgroundへ。これからDOMを操作します");
//   document.body.style.backgroundColor = "black";
//   return true;
// });

chrome.runtime.sendMessage(
  { type: "content", item: "どうしたらいい？" },
  (res: boolean) => {
    if (res) {
      document.body.style.backgroundColor = "pink";
      //popupに向けたメッセージをbackgroundから受け取った。
      alert(res);
    } else {
      alert(res);
    }
  }
);
