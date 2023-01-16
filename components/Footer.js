import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useMediaQuery } from "@chakra-ui/react";

const Footer = () => {
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  return (
    <div className="w-[100%] flex justify-center items-center self-end h-[80px]">
      <div className="max-w-[1100px] w-[100%] ">
        <Stack
          width={"full"}
          textAlign={"center"}
          alignItems="center"
          justifyContent="center"
          spacing={0}
          // py={4}
          px={isLessThan600 ? 4 : null}
        >
          <Text fontSize={{ base: "sm", md: "lg" }} width="full">
            © 2023 Copyright | All Rights Reserved
          </Text>
          <Text fontSize={{ base: "xs", md: "md" }}>Made by EGCaluag</Text>
        </Stack>
      </div>
    </div>
  );
};

export default Footer;
