import { Flex, Container, Button, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { useMediaQuery } from "@chakra-ui/react";
import Logo from "../Assets/logo.png";
import Image from "next/image";

function Navbar() {
  const [nav, setNav] = useState(false);
  const handleToggle = () => setNav((prev) => !prev);
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  return (
    <Container
      maxW={"100%"}
      className="h-[100px] flex justify-center fixed top-0"
      bgColor={"white"}
      zIndex={10}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className={`max-w-[1100px] h-[100%] w-[100%] ${
          isLessThan600 ? "px-0" : "px-0"
        } `}
      >
        <Link href="/">
          <div className={`flex items-center gap-[12px] `}>
            <div>
              <Image src={Logo} alt="Hero Image" height={40}></Image>
            </div>
          </div>
        </Link>
        <div className="hidden md:block">
          <Stack direction="row" spacing={8} alignItems={"center"}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/create-post">
              <Button
                color={"white"}
                bg={"red.600"}
                rounded={"full"}
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

        <div
          onClick={handleToggle}
          className={`md:hidden z-50 cursor-pointer ${
            nav ? "fixed right-4 top-9" : ""
          }`}
        >
          {!nav ? (
            <Icon as={AiOutlineMenu} boxSize="5" />
          ) : (
            <Icon as={AiOutlineClose} boxSize="5" />
          )}
        </div>
        <div
          className={
            !nav
              ? "hidden"
              : "fixed top-0 left-0 w-full h-screen bg-[white] flex flex-col justify-start items-center text-center md:hidden z-40 "
          }
        >
          <Stack
            spacing={8}
            alignItems={"center"}
            justifyContent={"center"}
            mt="180px"
            fontSize={"2xl"}
          >
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/create-post">
              <Button
                fontSize={"2xl"}
                color={"white"}
                bg={"red.600"}
                rounded={"full"}
                fontWeight="normal"
                px={8}
                py={6}
                _hover={{
                  bg: "red.500",
                }}
              >
                Write Post
              </Button>
            </Link>
            <div className="flex items-center gap-2 ">
              <a
                href="https://www.linkedin.com/in/erwinjamescaluag/"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  as={BsLinkedin}
                  boxSize="7"
                  cursor="pointer"
                  className="mt-[24px]"
                />
              </a>
              <a
                href="https://github.com/erwinjamescodes/scream-your-heart-out"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  as={FaGithubSquare}
                  boxSize="8"
                  cursor="pointer"
                  className="mt-[24px]"
                />
              </a>
            </div>
          </Stack>
        </div>
      </Flex>
    </Container>
  );
}

export default Navbar;
