import { ResponseType } from "./store/resDataState";

document.body.style.backgroundColor = "orange";

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message.isURL);
//   sendResponse("backgroundへ。これからDOMを操作します");
//   document.body.style.backgroundColor = "black";
//   return true;
// });

chrome.runtime.sendMessage(
  { type: "content", item: "どうしたらいい？" },
  async (res: ResponseType) => {
    const response = await res;
    if (response) {
      document.body.style.backgroundColor = "pink";
      //popupに向けたメッセージをbackgroundから受け取った。
      console.log(response);
      alert(response);
    } else {
      alert(response);
    }
  }
);
