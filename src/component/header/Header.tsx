import React from "react";
import { VFC } from "react";
import { Center } from "@chakra-ui/react";

type Props = {
  children: string;
};

export const Header: VFC<Props> = (props) => {
  const children = props.children;
  return (
    <>
      <Center bg="teal.400" h="40px" color="white" fontWeight="bold">
        {children}
      </Center>
    </>
  );
};
