// import { useState } from "react";

import { useRecoilValue } from "recoil";
import { dataListState } from "./store/dataListState";

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  console.log("BackURL", tabs[0].url);
});

console.log("hehihi");

export const Background = () => {
  const dataList = useRecoilValue(dataListState);
  console.log(dataList);

  // const [currentURL, setCurrentURL] = useState<string>();
  // const [isMatchUrl, setIsMatchUrl] = useState(false);
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   console.log(tabs[0].url);
  // });
  // chrome.tabs.sendMessage(
  //   tabs[0].id,
  //   { message: "BadURL" },
  //   function (item) {}
  // );
  // return { isMatchUrl };
};

// Background();

// const openTab = (query?: string) => {
//   if (query) {
//     chrome.tabs.create({ url: `https://www.google.com/search?q=${query}` });
//   }
// };

// chrome.runtime.onInstalled.addListener((): void => {
//   chrome.contextMenus.create({
//     id: "sample",
//     title: "選択した文字列を検索する",
//     contexts: ["selection"],
//   });
// });

// chrome.contextMenus.onClicked.addListener((info, tab): void => {
//   openTab(info.selectionText);
// });
