import React from "react";
import { ChangeEventHandler, useCallback, useState, VFC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { dataListState } from "../store/dataListState";

export const DataListAdd: VFC = () => {
  //inputから入力値を受け取り、保存する
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
        },
      ]);
    } else {
      setDataList((oldDataList) => [
        ...oldDataList,
        {
          id: oldDataList[oldDataList.length - 1].id + 1,
          url: inputUrl,
          time: inputTime,
        },
      ]);
    }

    //データを格納した後のフォームの初期化とエラーフラグの初期化
    setInputUrl("");
    setInputTime(0);
    setUrlError(false);
    setTimeError(false);
  }, [inputUrl, inputTime, setDataList]);

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

  return (
    <div>
      <input
        placeholder="URL"
        type="url"
        value={inputUrl}
        onChange={onChangeUrl}
      />
      {!urlError && <p>URLを入力してください</p>}
      <input
        placeholder="分"
        type="text"
        value={inputTime}
        onChange={onChangeTime}
      />
      {!timeError && <p>数字を入力してください</p>}
      {urlError && timeError && <button onClick={addData}>Add</button>}
    </div>
  );
};
