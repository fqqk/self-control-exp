chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //現在のタブのURLを取得
  const currentURL = tabs[0].url;
  console.log(currentURL);

  //popup.tsxと通信
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    sendResponse("dataList受け取りましたよ〜");
    chrome.storage.sync.set({ data: message }, function () {
      console.log("dataListをdataに入れました〜");
    });

    //ローカルストレージにdataListを保存
    chrome.storage.sync.get(["data"], function (res) {
      const dataList = res;
      console.log("dataをdataList:", dataList);
      console.log("長さ", dataList.data.length);

      //現在のタブのURLがローカルストレージに保存されているURLのドメイン情報を含むか検証
      for (let i = 0; i < dataList.data.length; i++) {
        if (currentURL?.match(dataList.data[i].domain)) {
          console.log("domainが一致したぞ！");
          chrome.runtime.sendMessage({ isURL: true }, function (conRes) {
            console.log("content_scriptより", conRes);
          });
          return;
        } else {
          console.log("まだ一致するURLはないみたいね");
        }
      }
    });
    return true;
  });
});

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   // console.log("dataList:", message);

//   sendResponse("dataList受け取りましたよ〜");
//   chrome.storage.sync.set({ data: message }, function () {
//     console.log("dataListをdataに入れました〜");
//   });
//   chrome.storage.sync.get(["data"], function (res) {
//     const dataList = res;
//     console.log("dataをdataList:", dataList);
//     console.log("長さ", dataList.data.length);

//     for (let i = 0; i < dataList.data.length; i++) {
//       if (dataList.data[i].url.match(currentURL)) {
//         chrome.runtime.sendMessage({ isURL: true }, function (res) {
//           console.log("content_scriptより", res);
//         });
//       } else {
//         console.log("まだ一致するURLはないみたいね");
//       }
//     }
//   });
//   return true;
// });
