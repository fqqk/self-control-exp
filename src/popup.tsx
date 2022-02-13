import React, { VFC, useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot, useRecoilValue } from "recoil";

import { DataListAdd } from "./component/DataListAdd";
import { DataItem } from "./component/DataItem";
import { dataListState } from "./store/dataListState";

const Popup: VFC = () => {
  const dataList = useRecoilValue(dataListState);
  const [currentURL, setCurrentURL] = useState<string>();

  chrome.runtime.sendMessage(dataList, function (res) {
    console.log("受け取ったメッセージ", res);
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  return (
    <>
      <ul style={{ minWidth: "400px", height: "400px" }}>
        <li>Current URL: {currentURL}</li>
        <DataListAdd />
        {dataList.map((dataItem) => (
          <DataItem key={dataItem.id} item={dataItem} />
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Popup />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
