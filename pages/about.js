import { Stack, Heading, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";

const About = () => {
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");

  return (
    <div
      className={`max-w-[1100px] w-[100%] flex flex-col mx-auto min-h-[calc(100vh-240px)]   ${
        isLessThan600 ? "mt-[30px] mb-[60px]" : "mt-[60px]"
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
          <Text>Let it all out...</Text>
        </Heading>
        <Stack fontSize={isLessThan600 ? "" : "xl"} spacing={6}>
          <Text>
            Screaming out your emotions can be a powerful way to relieve
            negative emotions. While this action might feel great to you, this
            may impose negative effects on the people surrounding you. So
            instead of screaming your heart out and causing harm to others,
            scream your heart out online!
          </Text>
          <Text>
            ScreamYourHeartOut.online is a safe and anonymous online platform
            for those looking to release their emotions and relieve stress. The
            website allows users to express themselves freely by anonymously
            posting their thoughts and feelings. Whether you're going through a
            difficult time or just need to let out a scream, this is the perfect
            outlet to let it all out and feel heard. With
            ScreamYourHeartOut.online, you can scream your heart out without
            judgment and without repercussions.
          </Text>
          <Text>
            Take note, however, that this website is not a substitute for
            therapy and should not be used as a sole means of addressing mental
            health concerns. It is important to seek professional help if you
            are experiencing overwhelming or unmanageable emotions.
          </Text>
        </Stack>
        <Link href="/create-post">
          <Button
            color={"white"}
            bg={"red.600"}
            rounded={"full"}
            mt={6}
            px={6}
            _hover={{
              bg: "red.500",
            }}
          >
            Write Post
          </Button>
        </Link>
      </Stack>
    </div>
  );
};

export default About;
