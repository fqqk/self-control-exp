import React from "react";
import { ChangeEventHandler, useCallback, useState, VFC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { dataListState } from "../store/dataListState";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
} from "@chakra-ui/react";
import { BaseButton } from "./atom/button/BaseButton";
import { UrlInput, TimeInput } from "./input/Input";

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
  const urlReg =
    /(https?:\/\/[\w\-\\.\\/\\?\\,%&=\\#\\:\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+)/g;
  const timeReg = /^([1-9]\d*|0)$/;

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
  }, [inputUrl, inputTime, setDataList]);

  //currentURLを登録するかどうか
  const addCurrent = () => {
    setInputUrl(currentURL!);
    setUrlError(true);
  };

  const onChangeUrl: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const value = e.target.value;
    setInputUrl(value);
    if (value.match(urlReg)) {
      setUrlError(true);
    } else {
      setUrlError(false);
    }
  }, []);

  const onChangeTime: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const stringNum = e.target.value;
      if (stringNum.match(timeReg)) {
        const value: number = Number(stringNum);
        setInputTime(value);
        setTimeError(true);
      } else {
        setTimeError(false);
        setInputTime(undefined);
      }
    },
    []
  );

  const times: number[] = [1, 2, 3, 4, 5];

  const optionTimes = times.map((time) => (
    <option value={time} key={time}>
      {time}
    </option>
  ));

  const handleChangeTime: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value: number = Number(e.target.value);
    setInputTime(value);
    setTimeError(true);
  };

  return (
    <FormControl>
      <Flex align="center" justify="space-between">
        <UrlInput value={inputUrl} placeholder="URL" onChange={onChangeUrl} />

        <BaseButton onClick={addCurrent}>Current URL</BaseButton>
      </Flex>

      {!urlError && (
        <FormHelperText color="red" fontSize="12px">
          Not URL
        </FormHelperText>
      )}
      <TimeInput value={inputTime} placeholder="min" onChange={onChangeTime} />
      <select value={inputTime} onChange={handleChangeTime}>
        <option>時間を指定して</option>
        {optionTimes}
      </select>
      {!timeError && (
        <FormHelperText color="red" fontSize="12px">
          Input time
        </FormHelperText>
      )}
      {urlError && timeError && (
        <BaseButton onClick={addData}>Add Data</BaseButton>
      )}
    </FormControl>
  );
};
