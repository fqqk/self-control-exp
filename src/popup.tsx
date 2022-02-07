import React, { VFC } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot, useRecoilValue } from "recoil";

import { DataListAdd } from "./component/DataListAdd";
import { DataItem } from "./component/DataItem";
import { dataListState } from "./store/dataListState";

const Popup: VFC = () => {
  const dataList = useRecoilValue(dataListState);
  // const [currentURL, setCurrentURL] = useState<string>();

  // const [infos, setInfo] = useRecoilState(dataState);

  // const BAD_URL = "https://www.youtube.com/";

  // useEffect(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     setCurrentURL(tabs[0].url);
  //   });
  // }, []);

  // if (currentURL?.match(BAD_URL)) {
  //   setTimeout(() => {
  //     window.open("https://www.google.com/?hl=ja");
  //   }, 3 * 1000);
  // }

  return (
    <>
      <ul style={{ minWidth: "400px", height: "400px" }}>
        {/* <li>Current URL: {currentURL}</li> */}
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <DataListAdd />
      {dataList.map((dataItem) => (
        <DataItem key={dataItem.id} item={dataItem} />
      ))}
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
