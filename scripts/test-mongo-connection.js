const { MongoClient, ServerApiVersion } = require('mongodb');

// Encode the password to handle special characters
const password = encodeURIComponent('HbQCzdRvNhUiJEOJ');
const uri = `mongodb+srv://saksaud:${password}@saksaud.is2duuq.mongodb.net/physiocare`;

console.log("Connecting with URI:", uri);

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
    console.log("Attempting to connect to MongoDB...");
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // List all databases in the cluster
    const databasesList = await client.db().admin().listDatabases();
    console.log("Your databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run(); 

// Encode the password to handle special characters
const password = encodeURIComponent('HbQCzdRvNhUiJEOJ');
const uri = `mongodb+srv://saksaud:${password}@saksaud.is2duuq.mongodb.net/physiocare`;

console.log("Connecting with URI:", uri);

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
    console.log("Attempting to connect to MongoDB...");
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // List all databases in the cluster
    const databasesList = await client.db().admin().listDatabases();
    console.log("Your databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run(); 