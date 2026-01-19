import { useState, useRef } from "react"
import { useAuth } from "../components/AuthContext"
import { Navigate } from "react-router"
import Header from "../components/Header"
import Tinymce from "../components/Tinymce"
import { createPost } from "../logic/fetch"


const NewPost = () => {
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const { user } = useAuth()
  const [editorContent, setEditorContent] = useState("")
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = await createPost(title, editorContent, user.id, isPublished)

    if (data.error) {
      setError(data.error)
      return
    }

    setRedirect(true);
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

        <legend><h3>New Post</h3></legend>
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
              style={{ display: "none"}}
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
          placeholder="Your post here..."
        />


        <div className="submitButtonBox">
          <button className="defaultBtn" type="submit">Create Post</button>
        </div>
      </form>
    </>
  )
}

export default NewPost