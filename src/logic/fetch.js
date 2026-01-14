const Authorization = { "Authorization": `Bearer ${localStorage.getItem("token")}` }

const fetchPostCount = async () => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts/count`, {
    headers: Authorization
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const fetchUserCount = async () => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/users/count`, {
    headers: Authorization
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const fetchAllPosts = async (page, isAdmin) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts?page=${page}&isAdmin=${isAdmin}`, {
    headers: Authorization
  })
    .then(response => response.json())
    .catch((error) => console.error(error))
}

const fetchPost = async (id) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
    headers: Authorization
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const loginAdmin = async (username, password, adminPassword) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/auth/login/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, adminPassword }),
  });
}

const deletePost = async (id) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
    headers: Authorization,
    method: "DELETE",
  })
    .then(response => response.json())
    .catch((error) => console.error(error))
}

const createPost = async (title, postContent, authorId, isPublished) => {
  console.log("Creating post with:", { title, postContent, authorId, isPublished });
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts`, {
    headers: Authorization,
    method: "POST",
    body: JSON.stringify({ title, postContent, authorId, isPublished }),
  })
    .then((response) => response.json())
}


export {
  fetchPostCount,
  fetchUserCount,
  fetchAllPosts,
  deletePost,
  loginAdmin,
  fetchPost,
  createPost,
}