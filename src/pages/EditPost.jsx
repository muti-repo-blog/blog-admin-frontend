import { useState, useEffect, use } from "react"
import { Navigate } from "react-router"
import Header from "../components/Header"
import Tinymce from "../components/Tinymce"
import { updatePost, fetchPost } from "../logic/fetch"
import { useParams } from "react-router";


const EditPost = () => {
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const { id } = useParams();
  const [editorContent, setEditorContent] = useState("")
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const load = async () => {
      const post = await fetchPost(id).then(r => r.post);
      setTitle(post.title);
      setEditorContent(post.content);
      setIsPublished(post.published);
    };

    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = await updatePost(id, title, editorContent, isPublished);

    if (data.error) {
      setError(data.error)
      return
    }

    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <>

      <Header links={[
        { id: 1, title: "Home", href: "/" },
        { id: 2, title: "Veiw Posts", href: "/posts" },
        { id: 3, title: "Veiw Users", href: "/users" },
      ]} />

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }} className="error">{error}</p>}

        <legend><h3>Edit Post</h3></legend>
        <div className="flexRowSpaceBetween">
          <div className="flexColumn">
            <label htmlFor="title">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              name="title"
              id="title"
              placeholder="Your title here"
            />
          </div>
          <label>
            {isPublished ?
              <button className="defaultBtn" onClick={() => setIsPublished(!isPublished)} type="button">Published</button> :
              <button className="defaultBtn" onClick={() => setIsPublished(!isPublished)} type="button">Draft</button>
            }
            <input
              style={{ display: "none" }}
              name="isPublished"
              id="isPublished"
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </label>
        </div>


        <Tinymce
          value={editorContent}
          onChange={setEditorContent}
          height="50vh"
          placeholder="Your updated post body here..."
        />

        <div className="submitButtonBox">
          <button className="defaultBtn" type="submit">Edit Post</button>
        </div>
      </form>
    </>
  )
}

export default EditPost