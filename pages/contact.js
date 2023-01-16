import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { useMediaQuery } from "@chakra-ui/react";

const Contact = () => {
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  return (
    <div
      className={`max-w-[1100px] min-h-[calc(100vh-240px)] w-[100%] flex flex-col items-center mx-auto  ${
        isLessThan600 ? "mt-[30px] mb-[30px]" : "mt-[60px]"
      }`}
    >
      <Stack width="full" spacing={{ base: 2 }} px={isLessThan600 ? 4 : 8}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl" }}
          width={"100%"}
          pb={"12px"}
          className="border-b-2 mb-4"
        >
          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Let us know your thoughts!</Text>
            <Stack
              direction={"row"}
              spacing={2}
              display={isLessThan600 ? "none" : "block"}
            >
              <a
                href="https://www.linkedin.com/in/erwinjamescaluag/"
                target="_blank"
                rel="noreferrer"
              >
                <Icon as={BsLinkedin} boxSize="7" cursor="pointer" />
              </a>

              <a
                href="https://github.com/erwinjamescodes/scream-your-heart-out"
                target="_blank"
                rel="noreferrer"
              >
                <Icon as={FaGithubSquare} boxSize="8" cursor="pointer" />
              </a>
            </Stack>
          </Stack>
        </Heading>

        <Stack width="full" spacing={{ base: 2 }} justifyContent="center">
          <Text fontSize={isLessThan600 ? "" : "xl"}>
            We value your feedback to help us provide the best possible
            experience for our users. If you have any suggestions or
            recommendations on how we can improve, please do not hesitate to
            reach out. We are always open to hearing your thoughts and working
            together to make the online world a safer and more enjoyable place
            for everyone.
          </Text>
          <form
            method="POST"
            action="https://getform.io/f/6b98fade-4da0-4183-8e2e-8e9522def79e"
            className="flex flex-col "
          >
            <Stack spacing={4} justifyContent={"center"} mt={8}>
              <input
                type="text"
                className={`border p-4 rounded-md focus:outline-none  ${
                  isLessThan600 ? "text-sm" : ""
                }`}
                placeholder="Name"
                name="name"
                required
              />
              <input
                type="email"
                className={`border p-4 rounded-md focus:outline-none  ${
                  isLessThan600 ? "text-sm" : ""
                }`}
                placeholder="Email"
                name="email"
                required
              />
              <textarea
                className={`border p-4 rounded-md focus:outline-none  ${
                  isLessThan600 ? "text-sm" : ""
                }`}
                name="message"
                rows="6"
                placeholder="Message"
                required
              ></textarea>
            </Stack>
            <Box alignSelf={"start"}>
              <Button
                type="submit"
                color={"white"}
                bg={"red.600"}
                rounded={"full"}
                mt={6}
                px={6}
                _hover={{
                  bg: "red.500",
                }}
              >
                Send Message
              </Button>
            </Box>
          </form>
        </Stack>
      </Stack>
    </div>
  );
};

export default Contact;
