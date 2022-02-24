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
      <Center
        bg="teal.400"
        w="100%"
        h="50px"
        color="white"
        fontWeight="bold"
        fontSize="md"
        position="fixed"
        top="0"
        left="0"
        zIndex="10"
      >
        {children}
      </Center>
    </>
  );
};
