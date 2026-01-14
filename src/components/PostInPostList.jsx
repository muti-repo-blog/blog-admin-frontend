import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/posts.css"
import { deletePost } from "../logic/fetch";

const PostInPostList = (props) => {
  const [dotsClicked, setDotsClicked] = useState(false);

  const handleKey = (action) => (e) => {
    if (e.key === "Enter") {
      action()
    }
  };

  const handlePostDelete = async (id) => {
    await deletePost(id)
    props.setPostsOnChange(!props.postsOnChange)
  }

  const handleBlur = (e) => {
    const related = e.relatedTarget;
    if (related && e.currentTarget.contains(related)) return;
    setDotsClicked(false);
  };

  return (
    <div
      className={props.index % 2 === 0 ? "post even" : "post odd"}
    >
      <h3 className="postTitle">{props.post.title}</h3>
      <div
        onFocus={() => setDotsClicked(true)}
        onBlur={handleBlur}
        onMouseEnter={() => setDotsClicked(true)}
        onMouseLeave={() => setDotsClicked(false)}
      >
        <img
          tabIndex={0}
          className="moreForPost"
          src="/assets/more.svg"
          alt="More options"
        />

        {dotsClicked && (
          <div
            onMouseEnter={() => setDotsClicked(true)}
            onMouseLeave={() => setDotsClicked(false)}
            className="fixed"
          >
            <Link to={`/posts/${props.post.id}`}>View</Link>
            <div
              tabIndex={0}
              onClick={() => alert("Edited")}
              onKeyDown={handleKey(() => alert("Edited"))}
            >
              Edit
            </div>
            <div
              className="delete"
              tabIndex={0}
              onClick={() => handlePostDelete(props.post.id)}
              onKeyDown={handleKey(() => handlePostDelete(props.post.id))}
            >Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostInPostList