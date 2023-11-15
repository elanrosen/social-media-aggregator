require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const passport = require('passport');
const session = require('express-session');

const cors = require('cors');
app.use(cors());
const FacebookStrategy = require('passport-facebook').Strategy;

const port = process.env.PORT || 3001;

app.use(express.json());

// Configure Passport with Facebook strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // In a real-world app, you would save the profile info to your database
    // For now, we will just pass the profile to the callback
    return cb(null, profile);
  }
));

app.use(session({
    secret: 'your_secret_key', // replace with a real secret key
    resave: false,
    saveUninitialized: true
  }));
  
  // Initialize Passport and restore authentication state, if any, from the session
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser((user, done) => {
    // Serialize user information into the session
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    // Here, find the user by their unique ID stored in the session,
    // and return the user object. For now, we'll just return a dummy user object
    done(null, { id: id, name: 'John Doe' });
  });


// Function to fetch posts from Twitter
async function fetchTwitterPosts() {
  try {
    const response = await axios.get('https://api.twitter.com/1.1/statuses/user_timeline.json', {
      headers: { Authorization: `Bearer ${process.env.TWITTER_API_KEY}` }
    });
    return response.data.map(tweet => ({ ...tweet, platform: 'Twitter' }));
  } catch (error) {
    console.error('Error fetching from Twitter:', error);
    return [];
  }
}

// Function to fetch posts from Facebook
async function fetchFacebookPosts() {
    try {
      const response = await axios.get(`https://graph.facebook.com/v12.0/me/posts`, {
        params: {
          access_token: process.env.FACEBOOK_API_KEY,
          fields: 'message,created_time' // Define the fields you need
        }
      });
      return response.data.data.map(post => ({ ...post, platform: 'Facebook' }));
    } catch (error) {
      console.error('Error fetching from Facebook:', error);
      return [];
    }
  }
  

// Function to fetch posts from Instagram
async function fetchInstagramPosts() {
    try {
      const response = await axios.get(`https://graph.instagram.com/me/media`, {
        params: {
          access_token: process.env.INSTAGRAM_API_KEY,
          fields: 'caption,media_url,timestamp' // Define the fields you need
        }
      });
      return response.data.data.map(post => ({ ...post, platform: 'Instagram' }));
    } catch (error) {
      console.error('Error fetching from Instagram:', error);
      return [];
    }
  }
  

// app.get('/api/posts', async (req, res) => {
//   try {
//     const twitterPosts = await fetchTwitterPosts();
//     const facebookPosts = await fetchFacebookPosts();
//     const instagramPosts = await fetchInstagramPosts();

//     const allPosts = [...twitterPosts, ...facebookPosts, ...instagramPosts];
//     res.json(allPosts);
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     res.status(500).json({ message: "Error fetching posts" });
//   }
// });

app.get('/api/posts', async (req, res) => {
    console.log("API called")
    try {
      const allPosts = [
        { id: 1, platform: 'Twitter', title: 'Test Tweet', content: 'This is a test tweet!', user: 'User1' },
        { id: 2, platform: 'Facebook', title: 'Facebook Post', content: 'Sharing a Facebook post!', user: 'User2' },
        { id: 3, platform: 'Instagram', title: 'Instagram Post', content: 'Instagram image post', imageUrl: 'https://www.thoughtco.com/thmb/TghRBdIZMYsnZ5aMEhsGBDcnODM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/BarackObama-799035cd446c443fb392110c01768ed0.jpg', user: 'User3' }
        // Add more dummy posts as needed
      ];
  
      res.json(allPosts);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: "Error" });
    }
  });

// Dummy endpoints for OAuth
app.get('/auth/twitter', (req, res) => {
    // Redirect to Twitter's OAuth page
    // You'll need to replace with actual Twitter OAuth URL and parameters
    res.redirect('https://twitter.com/oauth');
  });
  
    // Facebook OAuth endpoints
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
    );
  
  app.get('/auth/instagram', (req, res) => {
    // Redirect to Instagram's OAuth page
    // You'll need to replace with actual Instagram OAuth URL and parameters
    res.redirect('https://www.instagram.com/oauth');
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
