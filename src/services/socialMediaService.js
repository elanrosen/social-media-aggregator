// In services/socialMediaService.js
export const getPosts = async () => {
  try {
    // Update the URL to point to the correct backend server and port
    const response = await fetch('http://localhost:3001/api/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    throw error;
  }
};
