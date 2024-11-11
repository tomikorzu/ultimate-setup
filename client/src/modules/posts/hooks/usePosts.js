import { useEffect, useState } from "react";

export default function usePosts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const postResponse = await fetch("/posts.json");
    const postData = await postResponse.json();

    const userResponse = await fetch("/users.json");
    const userData = await userResponse.json();

    postData.forEach((post) => {
      const matchingUser = userData.find((user) => user.id === post.userId);

      if (matchingUser) {
        post.user = matchingUser;
      }
    });

    setPosts(postData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return posts;
}
