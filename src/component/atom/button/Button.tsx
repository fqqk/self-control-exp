import React from "react";
import { VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: string;
  onClick: () => void;
};

export const BaseButton: VFC<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <>
      <Button
        colorScheme="green"
        variant="outline"
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

export const DeleteButton: VFC<Props> = (props) => {
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

export const SubmitButton: VFC<Props> = (props) => {
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
