import { Button, Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import HeroSection from "../components/Home/Hero";
import Post from "../components/Home/Post";
import SkeletonPost from "../components/Home/SkeletonPost";
import NoResults from "../components/Home/NoResults";
import FilterPosts from "../components/Home/FilterPosts";
import { useMediaQuery } from "@chakra-ui/react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] =
    useState("Filter by Category");

  //Pagination tools
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerpage] = useState(8);
  const [isLessThan600] = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    (async () => {
      const getPosts = await fetch("/api/userposts");
      const getPostsJson = await getPosts.json();
      setPosts(getPostsJson);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsSearching(true);
      const term = searchTerm;

      if (term.length > 2 || term.length === 0) {
        const getPosts = await fetch(`/api/userposts/${term}`);
        const getPostsJson = await getPosts.json();
        setPosts(getPostsJson);
      }
      setIsSearching(false);
    })();
  }, [searchTerm]);

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  const paginationButtons = () => {
    return (
      <>
        <Stack direction={"row"}>
          <Button
            size={"sm"}
            className={`shadow-none   ${isLessThan600 < 600 ? "text-xs" : ""}`}
            disabled={currentPage === 1}
            onClick={() => {
              executeScroll();
              setCurrentPage(currentPage - 1);
            }}
            colorScheme={currentPage === 1 ? "gray" : "red"}
          >
            Previous
          </Button>
          <Button
            size={"sm"}
            className={`shadow-none ${isLessThan600 ? "text-xs" : ""}`}
            disabled={currentPage === totalPageCount}
            onClick={() => {
              executeScroll();
              setCurrentPage(currentPage + 1);
            }}
            colorScheme={currentPage === totalPageCount ? "gray" : "red"}
          >
            Next
          </Button>
        </Stack>
      </>
    );
  };

  const indexOfLastProduct = currentPage * productsPerpage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerpage;
  const filteredPosts =
    filteredCategory !== "Filter by Category"
      ? posts?.filter((post) => post.category.includes(filteredCategory))
      : posts;
  const totalPageCount = Math.ceil(filteredPosts?.length / productsPerpage);
  const RenderPosts = () => {
    return filteredPosts.length !== 0 ? (
      <>
        {filteredPosts
          ?.slice(indexOfFirstProduct, indexOfLastProduct)
          .map((post, index) => (
            <Post post={post} key={index} />
          ))}
        {paginationButtons()}
      </>
    ) : (
      <NoResults />
    );
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center px-4 max-w-[1100px] w-full mx-auto">
        <HeroSection />
        <div ref={myRef}></div>
        <FilterPosts
          setFilteredCategory={setFilteredCategory}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          filteredCategory={filteredCategory}
        />
        <Stack
          spacing={{ base: 6 }}
          justifyContent="center"
          alignItems="center"
          width="full"
          className="mb-[60px]"
        >
          {isLoading || isSearching ? <SkeletonPost /> : <RenderPosts />}
        </Stack>
      </main>
    </>
  );
}
