import MainLayout from "../../../common/layout/MainLayout";
import Post from "../components/Post";
import usePosts from "../hooks/usePosts";

export default function MainFeed() {
  const posts = usePosts();

  function renderPosts() {
    return posts.map((post) => {
      return <Post props={post} key={post.id} />;
    });
  }

  return (
    <MainLayout>
      <h1>Main Feed</h1>
      {renderPosts()}
    </MainLayout>
  );
}
