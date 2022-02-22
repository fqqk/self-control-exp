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
        colorScheme="blue"
        variant="outline"
        width="80px"
        height="20px"
        size="xs"
        fontSize="10px"
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
};
