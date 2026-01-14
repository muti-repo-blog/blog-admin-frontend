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
  const editorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = await createPost(title, editorRef.current.getContent(), user.id, true)

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
        { id: 1, text: "Home", href: "/" },
        { id: 2, text: "Veiw Posts", href: "/posts" },
        { id: 3, text: "Veiw Users", href: "/users" },
      ]} />

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }} className="error">{error}</p>}

        <legend><h3>New Post</h3></legend>
        <label htmlFor="title">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          name="title"
          id="title"
          placeholder="Your title here"
        />

      <Tinymce editorRef={editorRef} />


        <div className="submitButtonBox">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default NewPost