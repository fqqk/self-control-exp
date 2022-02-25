import React from "react";
import { VFC, ChangeEventHandler } from "react";
import { Select } from "@chakra-ui/react";

type Props = {
  value: number | undefined;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

export const SelectTime: VFC<Props> = (props) => {
  const { value, onChange } = props;
  const times: number[] = [10, 15, 30, 60];

  const optionTimes = times.map((time) => (
    <option value={time} key={time}>
      {time}
    </option>
  ));
  return (
    <>
      <Select
        placeholder="Select time"
        value={value}
        onChange={onChange}
        width="110px"
        size="xs"
      >
        {optionTimes}
      </Select>
    </>
  );
};
