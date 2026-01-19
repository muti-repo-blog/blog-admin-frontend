import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../css/posts.css"
import ItemList from "../components/ItemList";
import { fetchUserPosts, deletePost } from "../logic/fetch";
import { useParams } from "react-router";

const UserPosts = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [refreshPosts, setRefreshPosts] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const posts = await fetchUserPosts(id, page)
      setData(posts)

      setLoading(false)
    }

    load()

  }, [page, refreshPosts]);


  return (
    <>
      <Header
        links={[
          { id: 1, title: "Home", href: "/" },
          { id: 2, title: "New Post", href: "/posts/new" },
          { id: 3, title: "Veiw Users", href: "/users" },
        ]}
      />
      {loading && <h1>Loading...</h1>}
      <div className="posts">
        {data && !loading && data.posts.map((post, index) => (
          <ItemList
            key={post.id}
            title={post.title}
            index={index}
            dropdownLinks={[
              { id: 1, href: `/posts/${post.id}`, title: "View" },
              { id: 2, href: `/posts/${post.id}/edit`, title: "Edit" },
              {
                id: 3,
                action: async () => {
                  await deletePost(post.id)
                  setRefreshPosts(!refreshPosts)
                },
                title: "Delete",
                className: "delete"
              },
            ]}
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

export default UserPosts
