import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import { MdOutlineRefresh } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useMediaQuery } from "@chakra-ui/react";

const PostForm = () => {
  const [userPost, setUserPost] = useState({
    name: "",
    title: "",
    postBody: "",
    selectedCategories: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const postBodyLength = userPost.postBody?.length || 0;
  const [remainingCharacters, setRemainingCharacters] = useState(1500);
  useEffect(() => {
    setRemainingCharacters(1500 - postBodyLength);
  }, [userPost.postBody]);

  const router = useRouter();
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (localStorage.getItem("postBody")) {
      setUserPost((prev) => ({
        ...prev,
        postBody: localStorage.getItem("postBody"),
      }));
    }
    if (localStorage.getItem("name")) {
      setUserPost((prev) => ({
        ...prev,
        name: localStorage.getItem("name"),
      }));
    }
    if (localStorage.getItem("title")) {
      setUserPost((prev) => ({
        ...prev,
        title: localStorage.getItem("title"),
      }));
    }
    if (
      localStorage.getItem("category") &&
      localStorage.getItem("category") !== []
    ) {
      const retrievedString = localStorage.getItem("category");
      const convertedToArray = retrievedString?.split(",");
      setUserPost((prev) => ({
        ...prev,
        selectedCategories: convertedToArray,
      }));
    }
  }, []);

  const categories = [
    "Career",
    "Finance",
    "Love",
    "Academics",
    "Family",
    "Others",
  ];

  const handleSubmit = async () => {
    const userInput = {
      postedAt: Date.now(),
      name: userPost.name || "Anonymous",
      post_title: userPost.title,
      body: saveMultipleParagraphs(userPost.postBody),
      category: userPost.selectedCategories,
    };

    setIsLoading(true);

    const response = await fetch("/api/userposts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });

    const responseJson = await response.json();

    deleteLocalStorage();
    setIsLoading(false);
    router.push("/");
  };

  const saveToLocalStorage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, "500");
    localStorage.setItem("postBody", userPost.postBody);
    localStorage.setItem("name", userPost.name);
    localStorage.setItem("title", userPost.title);
    localStorage.setItem("category", userPost.selectedCategories);
  };

  const deleteLocalStorage = () => {
    localStorage.removeItem("postBody");
    localStorage.removeItem("name");
    localStorage.removeItem("title");
    localStorage.removeItem("category");
  };

  const resetForm = () => {
    setUserPost((prev) => ({
      ...prev,
      name: "",
      title: "",
      postBody: "",
      selectedCategories: [],
    }));
  };

  const saveMultipleParagraphs = (postBody) => {
    let paragraphs = postBody.split("\n");
    return paragraphs;
  };

  return (
    <Container
      maxW={"100%"}
      className="flex justify-center min-h-[calc(100vh-240px)]"
      marginTop={isLessThan600 ? "30px" : "60px"}
      marginBottom={isLessThan600 ? 8 : null}
    >
      <Flex
        alignItems="start"
        flexDirection={"column"}
        className="max-w-[1100px] w-[100%] "
        px={isLessThan600 ? null : 8}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl" }}
          width={"100%"}
          pb={"12px"}
          className="border-b-2 mb-4"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Let it all out...</Text>
            <Stack direction="row" spacing={2}>
              <Tooltip label="Reset Form" fontSize="xs">
                <span
                  onClick={() => {
                    resetForm();
                  }}
                >
                  <Icon as={MdOutlineRefresh} boxSize="6" cursor="pointer" />
                </span>
              </Tooltip>
              <Tooltip label="Delete Draft" fontSize="xs">
                <span
                  onClick={() => {
                    deleteLocalStorage();
                    resetForm();
                  }}
                >
                  <Icon as={MdDeleteOutline} boxSize="6" cursor="pointer" />
                </span>
              </Tooltip>
            </Stack>
          </Stack>
        </Heading>

        <Box className="w-[100%] pb-4 border-b-2">
          <Stack textAlign={"center"} spacing={{ base: 4 }}>
            <input
              value={
                userPost.name === "" || userPost.name === "null"
                  ? ""
                  : userPost.name
              }
              className={`border p-4 rounded-md focus:outline-none  ${
                isLessThan600 ? "text-sm" : ""
              }`}
              placeholder="Name (Optional)"
              onChange={(e) => {
                setUserPost((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            ></input>
            <input
              value={
                userPost.title === "" || userPost.title === "null"
                  ? ""
                  : userPost.title
              }
              className={`border p-4 rounded-md focus:outline-none ${
                isLessThan600 ? "text-sm" : ""
              }`}
              placeholder="Title"
              required
              onChange={(e) => {
                setUserPost((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            ></input>
            <textarea
              value={userPost.postBody === "" ? "" : userPost.postBody}
              className={`border p-4 rounded-md focus:outline-none h-[250px] ${
                isLessThan600 ? "text-sm" : ""
              }`}
              placeholder="Tell us how you feel..."
              required
              onChange={(e) => {
                setUserPost((prev) => ({
                  ...prev,
                  postBody: e.target.value,
                }));
              }}
            ></textarea>
          </Stack>

          <p
            className={`text-right text-sm pt-2 ${
              postBodyLength > 1500 ? "text-[red]" : ""
            }`}
          >
            {remainingCharacters}/1500
          </p>

          <Stack
            direction="row"
            mt={4}
            overflowX="auto"
            className="button-stack"
          >
            {categories.map((category, index) => {
              return (
                <Button
                  className={`${
                    userPost?.selectedCategories?.includes(category)
                      ? " bg-slate-200"
                      : "border"
                  }`}
                  key={index}
                  rounded={"full"}
                  px={{ base: "10", sm: "4", md: "6" }}
                  size="sm"
                  color={"gray"}
                  variant={"outline"}
                  fontSize={{ base: "2xs", sm: "sm", md: "sm" }}
                  onClick={() => {
                    const { selectedCategories } = userPost;
                    userPost.selectedCategories.includes(category)
                      ? setUserPost((prev) => ({
                          ...prev,
                          selectedCategories: selectedCategories.filter(
                            (item) => item !== category
                          ),
                        }))
                      : setUserPost((prev) => ({
                          ...prev,
                          selectedCategories: [...selectedCategories, category],
                        }));
                  }}
                >
                  {category}
                </Button>
              );
            })}
          </Stack>
        </Box>

        <Stack direction="row" mt={4} alignSelf="end" alignItems="center">
          <Button
            colorScheme="gray"
            rounded={"full"}
            px={6}
            variant="outline"
            color={"gray"}
            onClick={() => {
              saveToLocalStorage();
            }}
            fontSize={{ base: "xs", sm: "md" }}
            disabled={userPost.postBody === "" || userPost.postBody === null}
          >
            Save Draft
          </Button>
          <Button
            // colorScheme="red"
            bg={"red.600"}
            rounded={"full"}
            px={10}
            fontSize={{ base: "xs", sm: "md" }}
            disabled={
              userPost.title === "" ||
              userPost.title === null ||
              userPost.title === "null" ||
              userPost.postBody === "" ||
              userPost?.selectedCategories?.length === 0 ||
              postBodyLength > 1500
            }
            onClick={() => {
              handleSubmit();
            }}
          >
            {!isLoading ? "Post" : "Posting..."}
          </Button>
          {isLoading ? <Spinner color="red.500" /> : null}
        </Stack>
      </Flex>
    </Container>
  );
};

export default PostForm;
