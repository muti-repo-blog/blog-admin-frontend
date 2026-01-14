import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import { data, useParams } from "react-router";
import Tinymce from "../components/Tinymce";
import "../css/posts.css"
import { fetchPost } from "../logic/fetch";

const Post = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [postLoading, setPostLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const { id } = useParams();
  const [reloadComments, setReloadComments] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      setPostLoading(true)
      const data = await fetchPost(id);
      setPost(data.post)
      setPostLoading(false)
    }

    load()
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}/comments`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((response) => {
        setComments(response.postComments)
      })
      .catch((error) => console.error(error))
      .finally(() => setCommentsLoading(false))
  }, [reloadComments]);

  return (
    <>
      <Header
        links={[
          { id: 1, text: "Home", href: "/" },
          { id: 2, text: "Posts", href: "/posts" },
        ]}
      />
      {postLoading && <h1>Loading...</h1>}
      {post && !postLoading &&
        <>
          <div className="singlePost" key={post.id}>
            <h2>{post.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div >

          <div className="newComment">
            <Tinymce editorRef={editorRef} />
          </div>
        </>
      }

      {commentsLoading && <h1>Loading...</h1>}
      {comments && !commentsLoading && (
        <>

          <div className="commentTop">
            <h3>Comments</h3>
            <hr />
            {comments.length === 0 &&
              <p>No comments for this post yet</p>}
          </div>

          {comments.map(comment => (
            <div key={comment.id}>
              <div className="comment">
                <h3>@{comment.author.username}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />
              </div>
            </div>
          ))}
        </>
      )
      }

    </>
  );
};

export default Post;
