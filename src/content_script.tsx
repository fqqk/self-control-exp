chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.isURL);
  sendResponse("backgroundへ。これからDOMを操作します");
});
