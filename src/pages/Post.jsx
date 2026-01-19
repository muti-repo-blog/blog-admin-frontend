import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Tinymce from "../components/Tinymce";
import "../css/posts.css"
import { fetchPost, fetchAllComments, createComment, deleteComment, togglePostPublished } from "../logic/fetch";
import { useAuth } from "../components/AuthContext";
import toUserTime from "../components/toUserTime";

const Post = () => {
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [postLoading, setPostLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const { id } = useParams();
  const [reloadComments, setReloadComments] = useState(false);
  const [editorContent, setEditorContent] = useState("")
  const [error, setError] = useState("")
  const [publishedStatus, setPublishedStatus] = useState(null)

  useEffect(() => {
    const load = async () => {
      setPostLoading(true)
      const data = await fetchPost(id);
      setPost(data.post)
      setPostLoading(false)
      setPublishedStatus(data.post.published)
    }

    load()
  }, [id]);

  useEffect(() => {
    const load = async () => {
      setCommentsLoading(true)
      const data = await fetchAllComments(id);
      setComments(data.postComments)
      setCommentsLoading(false)
    }

    load()
  }, [reloadComments]);

  const handleSubmit = async (e) => {

    const data = await createComment(editorContent, user.id, post.id)

    if (data.error) {
      setError(data.error)
      return
    }

    setReloadComments(!reloadComments)
    setEditorContent("")
    setError("")
  }

  return (
    <>
      <Header
        links={[
          { id: 1, title: "Home", href: "/" },
          { id: 2, title: "View Posts", href: "/posts" },
          { id: 3, title: "View Users", href: "/users" },
        ]}
      />
      {postLoading && <h1>Loading...</h1>}
      <div className="postContainer">
        <div className="flexRowSpaceBetween postDetails">
          <div>
            <h2>@{post && post.author.username}</h2>
            <div className="fontSizeSmall">
              <div>Posted {post && toUserTime(post.createdAt)}</div>
              <div>
                {post && post.createdAt !== post.updatedAt && (
                  <span>Edited {toUserTime(post.updatedAt)}</span>
                )}
              </div>
            </div>
          </div>
          <button className="defaultBtn" onClick={() => {
            setPublishedStatus(!publishedStatus)
            togglePostPublished(post.id, !publishedStatus)
          }
          }>
            {publishedStatus ? "Published" : "Not published"}
          </button>
        </div>
        {post && !postLoading &&
          <>
            <div className="singlePost" key={post.id}>
              <h2>{post.title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div >

            <div className="TinymceContainer">
              {error && <p style={{ color: "red" }} className="error">{error}</p>}

              <Tinymce
                value={editorContent}
                onChange={setEditorContent}
                height="20vh"
                placeholder="Your comment here..."
              />


              <div className="submitButtonBox">
                <button className="defaultBtn" type="submit" onClick={() => handleSubmit()}>Submit</button>
              </div>
            </div>
          </>
        }
      </div>

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
                <div className="flexRowSpaceBetween">
                  <h3>@{comment.author.username}</h3>
                  <div
                    className="trashCan"
                    onClick={() => deleteComment(post.id, comment.id).then(() => setReloadComments(!reloadComments))}>
                    <img src="/assets/trash.svg" alt="delete post" />
                  </div>
                </div>
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
