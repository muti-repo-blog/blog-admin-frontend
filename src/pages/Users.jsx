import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../css/posts.css"
import ItemList from "../components/ItemList";
import { fetchAllUsers } from "../logic/fetch";
import { deleteUser } from "../logic/fetch";

const Users = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [refreshUsers, setRefreshUsers] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const users = await fetchAllUsers(page)
      setData(users)

      setLoading(false)
    }

    load()

  }, [page, refreshUsers]);


  return (
    <>
      <Header
        links={[
          { id: 1, title: "Home", href: "/" },
          { id: 2, title: "New Post", href: "/posts/new" },
          { id: 3, title: "Veiw Posts", href: "/posts" },
        ]}
      />
      {loading && <h1>Loading...</h1>}
      <div className="posts">
        {data && !loading && data.users.map((user, index) => (
          <ItemList
            key={user.id}
            title={user.username}
            index={index}
            deleteListItem={() => deleteUser(user.id)}
            dropdownLinks={[
              { id: 1, href: `/posts/user/${user.id}`, title: "View Users Posts" },
              { id: 2, href: `/posts/user/${user.id}/comments`, title: "View Users Comments" },
              {
                id: 3,
                action: async () => {
                  await deleteUser(user.id)
                  setRefreshUsers(!refreshUsers)
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

export default Users;
