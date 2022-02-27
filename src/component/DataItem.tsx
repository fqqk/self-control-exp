import React from "react";
import { useState } from "react";
import { VFC } from "react";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { dataListState } from "../store/dataListState";
import { DataType } from "../store/dataListState";

import { BaseButton } from "./atom/button/Button";
import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { NumberInput } from "@chakra-ui/number-input";
import { NumberInputField } from "@chakra-ui/number-input";
import { NumberInputStepper } from "@chakra-ui/number-input";
import { NumberIncrementStepper } from "@chakra-ui/number-input";
import { NumberDecrementStepper } from "@chakra-ui/number-input";

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

        <BaseButton onClick={deleteData} color="red" isClick={false}>
          delete
        </BaseButton>
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
