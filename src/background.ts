import { DataType } from "./store/dataListState";
import { ResponseType } from "./store/resDataState";

//tabの遷移を監視
chrome.tabs.onActivated.addListener((activeInfo) => {
  //tabが遷移したらページをリロード
  chrome.tabs.reload(() => {
    //ページリロードの完了を待つ
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete") {
        //ページリロードが完了したら現在のURLを取得
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          contentConnect().then((res) => {
            console.log(res);
            if (res.isDom) {
              chrome.alarms.create(`${res.id}`, {
                delayInMinutes: res.time,
              });
              chrome.alarms.onAlarm.addListener(() => {
                chrome.tabs.sendMessage(tabs[0].id!, { res: true }, (res) => {
                  console.log(res);
                });
              });
            } else {
              chrome.tabs.sendMessage(tabs[0].id!, { res: false });
            }
          });
        });
      }
    });
  });
});

//popupとの通信
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case "popup":
      console.log("popup:", message.item);
      popUpConnect(message.item);

      break;

    // case "content":
    //   console.log("content:", message.item);
    //   // contentConnect().then(sendResponse);

    //   contentConnect().then((res) => {
    //     chrome.alarms.create(`${res.id}`, {
    //       delayInMinutes: res.time,
    //     });
    //     chrome.alarms.onAlarm.addListener(() => {
    //       console.log("アラームです");
    //       sendResponse(res);
    //     });
    //   });

    //   break;
  }
  return true;
});

//popupとの通信
const popUpConnect = (item: DataType, sendResponse: void) => {
  chrome.storage.sync.set({ data: item }, () => {
    console.log("dataListをdataに入れました");
  });
};

//content_scriptとの通信

const contentConnect = async (): Promise<ResponseType> => {
  let item = false;
  console.log("最初のisDom", item);

  //非同期処理
  const isDom = await isDomFunc(item);

  console.log("処理後のisDom", isDom);
  return isDom;
};

//非同期処理により、itemにtrueが渡るタイミングとreturnするタイミングにずれが生じている
const isDomFunc = async (item: boolean): Promise<ResponseType> => {
  const currentURL = await getCurrentUrl();

  const data = await getLocalStorageItem();

  const isDom = await matchUrl(currentURL, data, item);

  return isDom;
};

//現在のタブURL取得
const getCurrentUrl = async (): Promise<string | undefined> => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentURL = tabs[0].url;
  return currentURL;
};

//ローカルストレージからデータを取得
const getLocalStorageItem = async (): Promise<DataType[]> => {
  const dataList = await chrome.storage.sync.get(["data"]);
  const data: DataType[] = dataList.data;
  return data;
};

//domainが一致しているかどうか
const matchUrl = async (
  currentURL: string | undefined,
  dataList: DataType[],
  item: boolean
): Promise<ResponseType> => {
  const isMatchDomain = await dataList.find((data) =>
    currentURL?.match(data.domain)
  );

  if (isMatchDomain) {
    console.log("isDomFunc_domainが一致", isMatchDomain);
    item = true;
  } else {
    console.log("isDomFunc_domain不一致");
  }

  return { id: isMatchDomain?.id, isDom: item, time: isMatchDomain?.time };
};
