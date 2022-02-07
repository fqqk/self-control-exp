import React from "react";
import { ChangeEventHandler, useCallback, VFC } from "react";
import { useRecoilState } from "recoil";

import { dataListState, DataType } from "../store/dataListState";

type Props = {
  item: DataType;
};

export const DataItem: VFC<Props> = ({ item }) => {
  const [dataList, setDataList] = useRecoilState(dataListState);

  const index = dataList.findIndex((listItem) => listItem === item);

  const editItemUrl: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: value }) => {
      const newList = replaceItemAtIndex(dataList, index, {
        ...item,
        url: value.innerText,
      });
      setDataList(newList);
    },
    [index, item, setDataList, dataList]
  );

  const editItemTime: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: value }) => {
      const newList = replaceItemAtIndex(dataList, index, {
        ...item,
        time: value.innerText,
      });
      setDataList(newList);
    },
    [index, item, setDataList, dataList]
  );

  const deleteData = useCallback(() => {
    const newList = removeItemAtIndex(dataList, index);
    setDataList(newList);
  }, [index, setDataList, dataList]);

  return (
    <div>
      <input type="url" value={item.url} onChange={editItemUrl} />
      <input type="text" value={item.time} onChange={editItemTime} />
      <button onClick={deleteData}>X</button>
    </div>
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
