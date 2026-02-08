import express from 'express'; // Import Express
import cors from 'cors'; // Import CORS
import { MongoClient, ObjectId } from 'mongodb';
import url from 'url';

const mongoURI = "mongodb+srv://mateonebo01:anteonebo%4011@cluster0.l3p70.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "postimet";  // Replace with your actual database name

// Create an Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
const client = new MongoClient(mongoURI);

app.get('/posts', async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { page = 1, perPage = 2 } = parsedUrl.query;

  await client.connect();
  const db = client.db(dbName);
  const postsCollection = db.collection('Posts'); // Assuming you have a "posts" collection

  const posts = await postsCollection.find()
    .skip((page - 1) * perPage) // Pagination
    .limit(parseInt(perPage)) // Limit results per page
    .toArray();

  const total = await postsCollection.countDocuments(); // Get total count of posts for pagination

  res.json({ data: posts, total });
});

app.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
  
    await client.connect();
    const db = client.db(dbName);
    const postsCollection = db.collection('Posts');
  
    // Query based on the 'id' field (not the MongoDB default _id)
    const post = await postsCollection.findOne({ id: postId });
  
    if (post) {
      res.json({ data: post });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
  

  app.post('/posts', async (req, res) => {
    const newPost = req.body;
  
    await client.connect();
    const db = client.db(dbName);
    const postsCollection = db.collection('Posts');
  
    // Insert the post and return the result, assuming the id field is set in the body
    const result = await postsCollection.insertOne(newPost);
    res.status(201).json({ data: { ...newPost, id: result.insertedId } });
  });
  
  app.put('/posts/:id', async (req, res) => {
    const postId = req.params.id;  // This is the 'id' coming from the URL
    let updatedPost = req.body;
  
    // Ensure we don't include _id in the update, as it's immutable
    delete updatedPost._id;
  
    await client.connect();
    const db = client.db(dbName);
    const postsCollection = db.collection('Posts');
  
    const result = await postsCollection.updateOne(
      { id: postId },  // Query by 'id' instead of '_id'
      { $set: updatedPost }
    );
  
    if (result.matchedCount > 0) {
      res.json({ data: updatedPost });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
  
  
  app.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;  // This is the 'id' coming from the URL
  
    await client.connect();
    const db = client.db(dbName);
    const postsCollection = db.collection('Posts');
  
    // Use 'id' field in place of '_id' when deleting
    const result = await postsCollection.deleteOne({ id: postId });  // Query by 'id' instead of '_id'
  
    if (result.deletedCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
  

// Start the server on port 3001
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
