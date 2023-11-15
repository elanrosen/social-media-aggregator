import React, { useState, useEffect } from 'react';
import './MainFeed.css';
import { getPosts } from '../services/socialMediaService'; // Adjust the path as necessary

function MainFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch posts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

// Function to render posts
const renderPosts = () => {
  return posts.map(post => (
    <div key={post.id} className="post">
      {/* Render post content here */}
      <h2>{post.title}</h2>
      {post.content && <p>{post.content}</p>}
      {post.platform && <p>Platform: {post.platform}</p>}
      {post.user && <p>User: {post.user}</p>}
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
    </div>
  ));
};


  return (
    <div className="main-feed">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && renderPosts()}
    </div>
  );
}

export default MainFeed;
