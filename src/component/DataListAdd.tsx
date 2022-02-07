import React from "react";
import { ChangeEventHandler, useCallback, useState, VFC } from "react";
import { useSetRecoilState } from "recoil";

import { dataListState } from "../store/dataListState";

export const DataListAdd: VFC = () => {
  //inputから入力値を受け取り、保存する
  const [inputUrl, setInputUrl] = useState("");
  const [inputTime, setInputTime] = useState("");

  //useStateで一旦受け取ったものをマージしてグローバルに管理
  const setDataList = useSetRecoilState(dataListState);

  //受け取った値にidを付与し、recoilに渡す
  const addData = useCallback(() => {
    setDataList((oldDataList) => [
      ...oldDataList,
      { id: getId(), url: inputUrl, time: inputTime },
    ]);
    setInputUrl("");
    setInputTime("");
  }, [inputUrl, inputTime, setDataList]);

  const onChangeUrl: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => {
      setInputUrl(value);
    },
    []
  );

  const onChangeTime: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }) => {
      setInputTime(value);
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
      <input
        placeholder="分"
        type="text"
        value={inputTime}
        onChange={onChangeTime}
      />
      <button onClick={addData}>Add</button>
    </div>
  );
};

let id = 0;
function getId() {
  return id++;
}
