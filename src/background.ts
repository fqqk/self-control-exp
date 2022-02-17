import { DataType } from "../src/store/dataListState";

// //タブが変更されたとき
// chrome.tabs.onActivated.addListener(() => {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     //現在のタブのURLを取得
//     const currentURL = tabs[0].url;
//     const tabId = tabs[0].id;
//     console.log(currentURL);
//     console.log(tabId);

//     //popup.tsxと通信し、ローカルストレージにdataListを保存
//     chrome.runtime.onMessage.addListener(function (
//       message,
//       sender,
//       sendResponse
//     ) {
//       sendResponse("dataList受け取りましたよ〜");
//       chrome.storage.sync.set({ data: message }, function () {
//         console.log("dataListをdataに入れました〜");
//       });

//       //ローカルストレージ内のデータを取得
//       chrome.storage.sync.get(["data"], function (res) {
//         const dataList = res;
//         console.log("dataをdataList:", dataList);
//         console.log("長さ", dataList.data.length);

//         //現在のタブのURLがローカルストレージに保存されているURLのドメイン情報を含むか検証
//         for (let i = 0; i < dataList.data.length; i++) {
//           if (currentURL?.match(dataList.data[i].domain)) {
//             console.log("domainが一致したぞ！", dataList.data[i].domain);
//             // content_scriptに一致フラグを送る
//             if (typeof tabId === "number") {
//               chrome.runtime.onMessage.addListener(function (
//                 message,
//                 sender,
//                 sendResponse
//               ) {
//                 sendResponse({ isURL: true });
//               });
//               // chrome.tabs.sendMessage(
//               //   tabId,
//               //   { isURL: true },
//               //   function (conRes) {
//               //     if (conRes) {
//               //       console.log("content_scriptより", conRes);
//               //     } else {
//               //       console.log("content_scriptからは何も返っていません。");
//               //     }
//               //   }
//               // );
//             }
//             return;
//           } else {
//             console.log("まだ一致するURLはないみたいね");
//           }
//         }
//       });
//       return true;
//     });
//   });
// });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case "popup":
      console.log("popup:", message.item);
      popUpConnect(message.item);
      break;

    case "content":
      console.log("content:", message.item);
      const isDom: boolean = contentConnect();
      sendResponse(isDom);
      break;
  }
});

//popupとの通信
const popUpConnect = (item: DataType, sendResponse: void) => {
  chrome.storage.sync.set({ data: item }, () => {
    console.log("dataListをdataに入れました");
  });
};

//content_scriptとの通信

const contentConnect = (): boolean => {
  let item = false;
  console.log("最初のisDom", item);

  //非同期処理
  const isDom = isDomFunc(item);

  console.log("処理後のisDom", isDom);
  return isDom;
};

//非同期処理により、itemにtrueが渡るタイミングとreturnするタイミングにずれが生じている
const isDomFunc = (item: boolean): boolean => {
  // const isDom = await getCurrentUrl().then(async (currentURL) => {
  //   const dataList = await getLocalStorageItem();
  //   const isDom = matchUrl(currentURL, dataList, item);
  //   return isDom;
  // });

  const isDom = item;

  const Promise = getCurrentUrl();
  const result = Promise.then((res) => {
    console.log(res);

    return res;
  });
  console.log(result);

  // getLocalStorageItem().then((res) => {
  //   console.log(res);
  // });

  // const currentURL = await getCurrentUrl();
  // const dataList = await getLocalStorageItem();
  // const isDom = matchUrl(currentURL, dataList, item);

  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   const currentURL = tabs[0].url;
  //   console.log("isDomFunc_currentURL:", currentURL);

  //   chrome.storage.sync.get(["data"], (res) => {
  //     const dataList = res;
  //     console.log("isDomFunc_dataList:", dataList);

  //     for (let i = 0; i < dataList.data.length; i++) {
  //       if (currentURL?.match(dataList.data[i].domain)) {
  //         console.log("isDomFunc_domainが一致", dataList.data[i].domain);
  //         item = true;
  //       } else {
  //         console.log("isDomFunc_domain不一致");
  //       }
  //       console.log("isDomFunc_item_for文内", item);
  //     }
  //     console.log("isDomFunc_item_storage内", item);
  //   });
  //   console.log("isDomFunc_item_storage外", item);
  // });
  // console.log("isDomFunc_item_return文手前", item);

  return isDom;
};

const getCurrentUrl = async (): Promise<string | undefined> => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentURL = tabs[0].url;
  return currentURL;
};

const getLocalStorageItem = async () => {
  const data = await chrome.storage.sync.get(["data"]);
  const dataList: DataType[] = data.then((res: { data: DataType[] }) => {
    return res.data;
  });
  return dataList;
};

const matchUrl = (
  currentURL: string | undefined,
  dataList: DataType[],
  item: boolean
): boolean => {
  for (let i = 0; i < dataList.length; i++) {
    if (currentURL?.match(dataList[i].domain)) {
      console.log("isDomFunc_domainが一致", dataList[i].domain);
      item = true;
    } else {
      console.log("isDomFunc_domain不一致");
    }
  }
  return item;
};
