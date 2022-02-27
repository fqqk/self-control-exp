import React from "react";
import { VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: string;
  onClick: () => void;
  isClick?: boolean;
  color: string;
};

export const BaseButton: VFC<Props> = (props) => {
  const { children, onClick, isClick, color } = props;
  return (
    <>
      <Button
        colorScheme={color}
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
