import React from "react";
import { VFC } from "react";
import { ChangeEventHandler } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import { dataListState } from "../store/dataListState";

import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { BaseButton } from "./atom/button/Button";

import { SelectTime } from "./atom/select/Select";

type Props = {
  currentURL: string | undefined;
};

export const DataListAdd: VFC<Props> = (props) => {
  //inputから入力値を受け取り、保存する
  const currentURL = props.currentURL;
  const [inputUrl, setInputUrl] = useState("");
  const [inputTime, setInputTime] = useState<number | undefined>(undefined);
  const [urlError, setUrlError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const [isClick, isClickSet] = useState(false);

  //useStateで一旦受け取ったものをマージしてグローバルに管理
  const setDataList = useSetRecoilState(dataListState);
  const dataList = useRecoilValue(dataListState);

  //受け取った値にidを付与し、recoilに渡す
  const addData = useCallback(() => {
    if (dataList.length === 0) {
      setDataList((oldDataList) => [
        ...oldDataList,
        {
          id: 0,
          url: inputUrl,
          time: inputTime,
          domain: inputUrl.split("/")[2],
        },
      ]);
    } else {
      setDataList((oldDataList) => [
        ...oldDataList,
        {
          id: oldDataList[oldDataList.length - 1].id + 1,
          url: inputUrl,
          time: inputTime,
          domain: inputUrl.split("/")[2],
        },
      ]);
    }

    //データを格納した後のフォームの初期化とエラーフラグの初期化
    setInputUrl("");
    setInputTime(0);
    setUrlError(false);
    setTimeError(false);
    isClickSet(false);
  }, [inputUrl, inputTime, setDataList]);

  //currentURLを登録するかどうか
  const addCurrent = () => {
    if (!isClick) {
      isClickSet(true);
      setInputUrl(currentURL!);
      setUrlError(true);
    } else {
      isClickSet(false);
      setInputUrl("");
      setUrlError(false);
    }
  };

  const handleChangeTime: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value: number = Number(e.target.value);
    setInputTime(value);
    setTimeError(true);
  };

  return (
    <Box p={4} borderTop="1px" borderTopColor="blackAlpha.200">
      <Flex align="center" justify="space-around">
        <BaseButton onClick={addCurrent} isClick={isClick} color={"green"}>
          {isClick ? "Get URL" : "Current URL"}
        </BaseButton>
        <SelectTime value={inputTime} onChange={handleChangeTime} />
        {urlError && timeError && (
          <BaseButton onClick={addData} color="blue" isClick={false}>
            Add Data
          </BaseButton>
        )}
      </Flex>
    </Box>
  );
};
