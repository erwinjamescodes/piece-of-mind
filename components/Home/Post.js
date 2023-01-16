import {
  Card,
  Heading,
  Stack,
  Text,
  Badge,
  Button,
  Collapse,
} from "@chakra-ui/react";
import _ from "lodash";
import { useState } from "react";
import formatDate from "../utilities/FormatDate";

const Post = ({ post }) => {
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

  let date = new Date(post.postedAt);
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleString("en-US", options);

  const toUpperCase = (name) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return capitalized;
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="max-w-[1100px] w-[100%]" p={{ base: 6, md: 8 }}>
      <Stack spacing={{ base: 2 }}>
        <Heading size={{ base: "sm", md: "md" }} textTransform="uppercase">
          {post.post_title}
        </Heading>

        <Heading size="xs" fontWeight={"medium"}>
          <strong>{toUpperCase(post.name)}</strong> posted{" "}
          {/* {formattedDate} */}
          {formatDate(post.postedAt)}
        </Heading>
      </Stack>
      {post.body.map((item, index) => {
        return (
          <Text
            key={index}
            pt="4"
            fontSize={{ base: "sm", md: "md" }}
            className="w-[100%] "
            wordBreak={"break-word"}
          >
            {item}
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
    </Card>
  );
};

export default Post;
