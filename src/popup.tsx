import React, { VFC, useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot, useRecoilValue } from "recoil";

import { DataListAdd } from "./component/DataListAdd";
import { DataItem } from "./component/DataItem";
import { dataListState } from "./store/dataListState";

import { ChakraProvider } from "@chakra-ui/provider";
import { Header } from "./component/atom/header/Header";
import { Box, Heading, Stack } from "@chakra-ui/layout";

const Popup: VFC = () => {
  const dataList = useRecoilValue(dataListState);
  const [currentURL, setCurrentURL] = useState<string>();

  //backgroundと通信
  useEffect(() => {
    chrome.runtime.sendMessage(
      { type: "popup", item: dataList },
      function (res) {
        console.log("受け取ったメッセージ", res);
      }
    );
  }, [dataList]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  return (
    <>
      <Box pt={12}>
        <Header children="self control" />
        <Stack
          direction="column"
          minW="400px"
          h="300px"
          p={4}
          overflow="scroll"
        >
          {dataList.map((dataItem) => (
            <DataItem key={dataItem.id} item={dataItem} />
          ))}
        </Stack>
        <DataListAdd currentURL={currentURL} />
      </Box>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <Popup />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
