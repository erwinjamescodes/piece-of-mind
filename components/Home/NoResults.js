import { Text } from "@chakra-ui/react";

const NoResults = () => {
  return (
    <Text mt={8} fontSize={{ base: "xl", md: "2xl" }} textAlign="center">
      No matching results...
    </Text>
  );
};

export default NoResults;
