import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../css/posts.css"
import PostInPostList from "../components/PostInPostList";
import { fetchAllPosts } from "../logic/fetch";

const Posts = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [postsOnChange, setPostsOnChange] = useState(false)
  const [isAdmin, setIsAdmin] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
        const posts =  await fetchAllPosts(page, isAdmin)

        setData(posts)

      setLoading(false)
    }

    load()

  }, [page, postsOnChange]);


  return (
    <>
      <Header
        links={[
          { id: 1, text: "Home", href: "/" },
          { id: 2, text: "New Post", href: "/posts/new" },
          { id: 3, text: "Veiw Users", href: "/users" },
        ]}
      />
      {loading && <h1>Loading...</h1>}
      <div className="posts">
        {data && !loading && data.posts.map((post, index) => (
          <PostInPostList
            setPostsOnChange={setPostsOnChange}
            postsOnChange={postsOnChange}
            key={post.id} post={post}
            index={index}
          />
        ))}
      </div>

      {data && data.totalPages === 0 &&
        <p>
          No posts yet go make one
        </p>
      }

      {data && data.totalPages !== 0 &&
        <div className="paganation">
          <button className="pageArrowButton" tabIndex={0} disabled={page === 1} onClick={() => setPage(page - 1)}>
            <img className="pageArrow" src="/assets/arrow-left.svg" alt="back one page" />
          </button>
          <div className="currentPage">Page {page} of {data.totalPages}</div>
          <button className="pageArrowButton" tabIndex={0} disabled={page === data.totalPages} onClick={() => setPage(page + 1)}>
            <img className="pageArrow" src="/assets/arrow-right.svg" alt="forwards one page" />
          </button>
        </div>}
    </>
  );

};

export default Posts;
