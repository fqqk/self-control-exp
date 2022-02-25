import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useCallback, VFC } from "react";
import { useRecoilState } from "recoil";
import { dataListState, DataType } from "../store/dataListState";

import { DeleteButton } from "./atom/button/Button";
import {
  Box,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

type Props = {
  item: DataType;
};
export const DataItem: VFC<Props> = ({ item }) => {
  const [dataList, setDataList] = useRecoilState(dataListState);
  const [time, setTime] = useState<number | undefined>(item.time);

  const index = dataList.findIndex((listItem) => listItem === item);

  const deleteData = useCallback(() => {
    const newList = removeItemAtIndex(dataList, index);
    setDataList(newList);
  }, [index, setDataList, dataList]);

  const handleChangeTime = useCallback(
    (value) => {
      const numValue: number = Number(value);
      setTime(numValue);
      const newList = replaceItemAtIndex(dataList, index, {
        ...item,
        time: time,
      });
      setDataList(newList);
    },
    [index, item, setDataList, dataList]
  );

  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        <Heading fontSize="20px" display="inline-block" mr="10px">
          {item.domain}
        </Heading>
        <NumberInput
          defaultValue={item.time}
          size="sm"
          maxW={20}
          value={time}
          onChange={handleChangeTime}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

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
