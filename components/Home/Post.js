import { Card, Heading, Stack, Text, Badge } from "@chakra-ui/react";

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

  // console.log(typeof post.body);

  return (
    <Card className="max-w-[1100px] w-[100%]" p={{ base: 6, md: 8 }}>
      <Stack spacing={{ base: 2 }}>
        <Heading size={{ base: "sm", md: "md" }} textTransform="uppercase">
          {post.post_title}
        </Heading>
        <Heading size="xs" fontWeight={"medium"}>
          Posted by <strong>{post.name}</strong> on {formattedDate}
        </Heading>
      </Stack>
      {post.body.map((item) => {
        return (
          <Text
            pt="4"
            fontSize={{ base: "sm", md: "md" }}
            className="w-[100%] "
            wordBreak={"break-word"}
          >
            {item}
          </Text>
        );
      })}
      <Stack direction="row" marginTop={6}>
        {post?.category?.map((cat, index) => {
          return (
            <Badge
              key={index}
              colorScheme={categoryColorScheme(cat)}
              px={2}
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
