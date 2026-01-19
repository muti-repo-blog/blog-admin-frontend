import { useState, useEffect } from 'react'
import "../css/globle.css"
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import { fetchPostCount, fetchUserCount } from '../logic/fetch';
import { useAuth } from '../components/AuthContext';

const App = () => {
  const [postCount, setPostCount] = useState(null)
  const [userCount, setUserCount] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const postCount = await fetchPostCount()
      const userCount = await fetchUserCount()

      setPostCount(postCount)
      setUserCount(userCount.numberOfUsers)
      setLoading(false)
    }

    load()
  }, [isAuthenticated])


  return (
    <>
      <Header links={[
        { id: 1, title: "New Post", href: "/posts/new" },
        { id: 2, title: "View Posts", href: "/posts" },
        { id: 3, title: "View Users", href: "/users" },
      ]} />

      <div className="outline">
        <h2 className='outlineText'>Welcome to <em className='outlineText'>Project: Blog</em></h2>
        <img className='outlineImg' src="/assets/blog.jpg" alt="" />
      </div>

      <div className='info'>
        {postCount && !loading &&
          <InfoCard
            title="Posts"
            herf="/posts"
            info={
              <>
                <div>Number of posts {postCount.numberOfPosts}</div>
                <div>Number of published posts {postCount.numberOfPublishedPosts}</div>
              </>
            } />
        }
        {userCount && !loading &&
          <InfoCard
            title="Users"
            herf="/users"
            info={
              <>
                <div>Number of users {userCount}</div>
              </>
            } />
        }
      </div>
    </>
  );
};

export default App
