import React from "react";
import { VFC, ChangeEventHandler } from "react";
import { Input } from "@chakra-ui/react";

type Props<T> = {
  value: T;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
};

export const UrlInput: VFC<Props<string>> = (props) => {
  const { value, onChange, placeholder } = props;
  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        width="200px"
        size="xs"
        variant="outline"
      ></Input>
    </>
  );
};

export const TimeInput: VFC<Props<number | undefined>> = (props) => {
  const { value, onChange, placeholder } = props;
  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        width="50px"
        size="xs"
        variant="outline"
      ></Input>
    </>
  );
};
