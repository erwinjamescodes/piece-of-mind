import {
  Card,
  Heading,
  Stack,
  Text,
  Badge,
  Button,
  Collapse,
  Box,
} from "@chakra-ui/react";
import _ from "lodash";
import { useState } from "react";
import formatDate from "../utilities/FormatDate";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import toUpperCase from "../utilities/ToUpperCase";

const Post = ({ post }) => {
  const [accordionOn, setAccordionOn] = useState(false);
  const categoryColorScheme = (cat) => {
    switch (cat) {
      case "Career":
        return "orange";
      case "Family":
        return "blue";
      case "Love":
        return "red";
      case "Finance":
        return "yellow";
      case "Academics":
        return "purple";
      case "Others":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      as={Card}
      className="max-w-[1100px] w-[100%] focus:outline-none focus:border-none"
      borderRadius={5}
      textAlign={"left"}
    >
      <AccordionItem border="none">
        <AccordionButton
          px={{ base: 6 }}
          pt={6}
          pb={accordionOn ? 6 : 0}
          _hover={{ bg: "none" }}
          _focus={{ borderRadius: 5 }}
          onClick={() => {
            setAccordionOn(!accordionOn);
          }}
          // animateOpacity
        >
          <Stack direction="row" width="full" justifyContent="space-between">
            <Stack
              spacing={{ base: 1 }}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Heading size={{ base: "sm", md: "md" }} textAlign="left">
                {toUpperCase(post.post_title)}
              </Heading>
              <Text fontSize="xs" fontWeight={"medium"} textAlign="left">
                {toUpperCase(post.name)} posted {formatDate(post.postedAt)}
              </Text>
            </Stack>
            <AccordionIcon color={"gray.300"} />
          </Stack>
        </AccordionButton>
        <AccordionPanel pb={6} px={{ base: 6 }}>
          {post.body.map((item, index) => {
            return (
              <Text
                key={index}
                pt="2"
                fontSize={{ base: "sm", md: "md" }}
                className="w-[100%] "
                wordBreak={"break-word"}
              >
                {toUpperCase(item)}
              </Text>
            );
          })}
          <Stack
            direction="row"
            marginTop={6}
            overflowX="auto"
            className="button-stack"
          >
            {post?.category?.map((cat, index) => {
              return (
                <Badge
                  fontSize={"2xs"}
                  key={index}
                  colorScheme={categoryColorScheme(cat)}
                  px={3}
                  py={1}
                  rounded={"full"}
                >
                  {cat}
                </Badge>
              );
            })}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Post;
