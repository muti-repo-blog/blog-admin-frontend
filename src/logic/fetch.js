const Authorization = {
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
}

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

const fetchAllComments = async (id) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}/comments`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
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
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts`, {
    headers: Authorization,
    method: "POST",
    body: JSON.stringify({ title, postContent, authorId, isPublished }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const createComment = async (commentContent, authorId, id) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}/comments`, {
    headers: Authorization,
    method: "POST",
    body: JSON.stringify({ commentContent, authorId }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const deleteComment = async (postId, commentId) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`, {
    headers: Authorization,
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const togglePostPublished = async (id, publishedStatus) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}/publish`, {
    headers: Authorization,
    method: "PATCH",
    body: JSON.stringify({ publishedStatus }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const updatePost = async (id, title, postContent, isPublished) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}/edit`, {
    headers: Authorization,
    method: "PATCH",
    body: JSON.stringify({ title, postContent, isPublished }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const fetchAllUsers = async (page) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/users?page=${page}`, {
    headers: Authorization
  })
    .then(response => response.json())
    .catch((error) => console.error(error))
}

const deleteUser = async (id) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/users/${id}`, {
    headers: Authorization,
    method: "DELETE",
  })
    .then(response => response.json())
    .catch((error) => console.error(error))
}

const fetchUserPosts = async (userId, page) => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/posts/users/${userId}?page=${page}`, {
    headers: Authorization
  })
    .then(response => response.json())
    .catch((error) => console.error(error))
}

export {
  fetchPostCount,
  fetchUserCount,
  fetchAllPosts,
  deletePost,
  loginAdmin,
  fetchPost,
  createPost,
  fetchAllComments,
  createComment,
  deleteComment,
  togglePostPublished,
  updatePost,
  fetchAllUsers,
  deleteUser,
  fetchUserPosts,
}