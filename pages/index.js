import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HeroSection from "../components/Home/Hero";
import Post from "../components/Home/Post";
import SkeletonPost from "../components/Home/SkeletonPost";
import NoResults from "../components/Home/NoResults";
import FilterPosts from "../components/Home/FilterPosts";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] =
    useState("Filter by Category");

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

  const renderPosts = (posts, filteredCategory) => {
    const filteredPosts =
      filteredCategory !== "Filter by Category"
        ? posts.filter((post) => post.category.includes(filteredCategory))
        : posts;

    return filteredPosts.length !== 0 ? (
      filteredPosts.map((post, index) => <Post post={post} key={index} />)
    ) : (
      <NoResults />
    );
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center px-4 ">
        <HeroSection />
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
          {isLoading || isSearching ? (
            <SkeletonPost />
          ) : (
            renderPosts(posts, filteredCategory)
          )}
        </Stack>
      </main>
    </>
  );
}
