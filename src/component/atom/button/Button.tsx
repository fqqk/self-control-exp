import React from "react";
import { VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: string;
  onClick: () => void;
  isClick: boolean;
};

export const BaseButton: VFC<Props> = (props) => {
  const { children, onClick, isClick } = props;
  return (
    <>
      <Button
        colorScheme="green"
        variant={isClick ? "solid" : "outline"}
        width="90px"
        height="30px"
        size="sm"
        fontSize="14px"
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
};

export const DeleteButton: VFC<Omit<Props, "isClick">> = (props) => {
  const { children, onClick } = props;
  return (
    <>
      <Button
        colorScheme="red"
        variant="outline"
        width="70px"
        height="30px"
        size="sm"
        fontSize="14px"
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
};

export const SubmitButton: VFC<Omit<Props, "isClick">> = (props) => {
  const { children, onClick } = props;
  return (
    <>
      <Button
        colorScheme="blue"
        variant="outline"
        width="70px"
        height="30px"
        size="sm"
        fontSize="14px"
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
};
