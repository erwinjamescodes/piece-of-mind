import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Card,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

const FilterPosts = ({
  setFilteredCategory,
  setSearchTerm,
  filteredCategory,
  searchTerm,
}) => {
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");
  const categories = [
    "Career",
    "Finance",
    "Love",
    "Academics",
    "Family",
    "Others",
  ];

  return (
    <Card
      className="w-[100%] max-w-[1100px]"
      py={1}
      mb={6}
      px={3}
      rounded={"full"}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          direction="row"
          alignItems={"center"}
          pl={2}
          className="w-[100%]"
        >
          <Icon
            as={AiOutlineSearch}
            boxSize="5"
            ml={isLessThan600 ? null : 2}
            mb={1}
            color={"gray.500"}
          />
          <input
            value={searchTerm}
            className="border w-[100%] px-0 py-4 rounded-md focus:outline-none border-none bg-transparent"
            placeholder="Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
        </Stack>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"flex-end"}
          pr={isLessThan600 ? 3 : 5}
        >
          <Menu>
            <MenuButton
              as={Button}
              backgroundColor={"transparent"}
              _hover={{ bg: "transparent" }}
              _expanded={{ bg: "transparent" }}
              fontWeight={"normal"}
              color={"gray.500"}
              p={isLessThan600 ? 0 : null}
              mr={isLessThan600 ? -2 : null}
            >
              {!isLessThan600 ? (
                filteredCategory
              ) : (
                <Icon
                  as={BsFilter}
                  boxSize="5"
                  color={"gray.500"}
                  justifySelf={"flex-end"}
                  cursor="pointer"
                  onClick={() => {
                    setFilteredCategory("Filter by Category");
                    setSearchTerm("");
                  }}
                />
              )}
            </MenuButton>

            <MenuList>
              {categories.map((cat, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      setFilteredCategory(cat);
                    }}
                  >
                    {cat}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <Icon
            as={AiOutlineClose}
            boxSize="4"
            ml={2}
            mr={-1}
            mb={1}
            color={"gray.500"}
            justifySelf={"flex-end"}
            cursor="pointer"
            onClick={() => {
              setFilteredCategory("Filter by Category");
              setSearchTerm("");
            }}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default FilterPosts;
