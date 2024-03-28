const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

// DB_USER=khairul-portfolio
// DB_PASS=M7ttgDH4WmGDIOZg

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.52ba6.mongodb.net/?retryWrites=true&w=majority`;

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
        // await client.connect();
        // Send a ping to confirm a successful connection

        const skillsCollection = client.db('KhairulPortfolio').collection('skills');
        const projectsCollection = client.db('KhairulPortfolio').collection('projects');
        const contactsInfoCollection = client.db('KhairulPortfolio').collection('contactsInfo');

        app.get('/skills', async (req, res) => {
            const result = await skillsCollection.find().toArray();
            // console.log(result[0]);
            res.send(result);
        })

        app.get('/projects', async (req, res) => {
            const projects = await projectsCollection.find().toArray();
            const result = projects.slice(0,4);
            res.send(result);
        })

        app.post('/contact', async (req, res) => {
            const constactInfo = req.body;
            const result = await contactsInfoCollection.insertOne(constactInfo);
            res.send(result);
        })

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Khairul Porfolio server side is running');
})

app.listen(port, () => {
    console.log(`Khairul Portfolio is running on port ${port}`);
})