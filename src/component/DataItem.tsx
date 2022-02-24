import { Flex } from "@chakra-ui/layout";
import React from "react";
import { ChangeEventHandler, useCallback, VFC, useState } from "react";
import { useRecoilState } from "recoil";
import { dataListState, DataType } from "../store/dataListState";

import { DeleteButton } from "./atom/button/Button";
import { UrlInput, TimeInput } from "./atom/input/Input";
import { Box, Heading } from "@chakra-ui/react";

type Props = {
  item: DataType;
};
export const DataItem: VFC<Props> = ({ item }) => {
  const [dataList, setDataList] = useRecoilState(dataListState);

  //バリデーション
  // const [urlError, setUrlError] = useState(true);
  const [timeError, setTimeError] = useState(true);
  const urlReg =
    /(https?:\/\/[\w\-\\.\\/\\?\\,%&=\\#\\:\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+)/g;
  const timeReg = /^([1-9]\d*|0)$/;
  const index = dataList.findIndex((listItem) => listItem === item);

  // const editItemUrl: ChangeEventHandler<HTMLInputElement> = useCallback(
  //   (e) => {
  //     const value = e.target.value;
  //     if (!value.match(urlReg)) {
  //       setUrlError(false);
  //     } else {
  //       setUrlError(true);
  //     }
  //     const newList = replaceItemAtIndex(dataList, index, {
  //       ...item,
  //       url: value,
  //     });
  //     setDataList(newList);
  //   },
  //   [index, item, setDataList, dataList]
  // );

  const editItemTime: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value: number = Number(e.target.value);
      if (isNaN(value)) {
        setTimeError(false);
      } else {
        setTimeError(true);
        const newList = replaceItemAtIndex(dataList, index, {
          ...item,
          time: value,
        });
        setDataList(newList);
      }
    },
    [index, item, setDataList, dataList]
  );
  const deleteData = useCallback(() => {
    const newList = removeItemAtIndex(dataList, index);
    setDataList(newList);
  }, [index, setDataList, dataList]);

  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        <Box>
          <Heading fontSize="20px" display="inline-block" mr="10px">
            {item.domain}
          </Heading>
          {/* <UrlInput
          value={item.domain}
          placeholder="URL"
          onChange={editItemUrl}
        /> */}
          {/* {!urlError && <p>URLを入力してください</p>} */}

          <TimeInput
            value={item.time}
            placeholder="min"
            onChange={editItemTime}
          />
        </Box>
        {!timeError && <p>数字を入力してください</p>}
        <DeleteButton onClick={deleteData}>delete</DeleteButton>
      </Flex>
    </Box>
  );
};

function replaceItemAtIndex(
  arr: DataType[],
  index: number,
  newValue: DataType
) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: DataType[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
