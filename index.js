const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();



const port = 5000;


app.use(cors());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2ev6cf0.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// database collection


const categoryCollection = client.db("airbnbDB").collection("category");
const roomsCollection = client.db("airbnbDB").collection("rooms");








// all api are here

// api for all category
app.get('/allCategory', async (req, res) => {

    const result = await categoryCollection.find().toArray();
    res.send(result);
    
  });

// api for all rooms
app.get('/:category', async (req, res) => {

  const categoryName = req.params.category;
  if(categoryName == "all"){
    const result = await roomsCollection.find().toArray();
    res.send(result);
    return;

  }
  const query = { category:  categoryName};
  const result = await roomsCollection.find(query).toArray();
  console.log(categoryName, query, result);
  res.send(result);
    
  });














app.get('/', (req, res) => {
  res.send('Airbnb clone server is running.');
})

app.listen(port, () => {
  console.log(`Airbnb clone server is running on port:  ${port}`);
})