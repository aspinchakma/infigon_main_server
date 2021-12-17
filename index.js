const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');

require('dotenv').config()

const port = 5000 || process.env.PORT;
app.use(cors());
app.use(express.json())



app.get('/', (req, res) => {
    res.send("Ok bro")
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yu5z2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




async function run() {
    try {
        await client.connect();

        console.log(uri)
        const database = client.db("infigon_website");
        const programs = database.collection("programs");

        app.get('/programs', async (req, res) => {

            const cursor = programs.find({});
            const result = await cursor.toArray();
            res.send(result)
        })


        app.get('/programs/:id', async (req, res) => {
            const programId = req.params.id;
            const query = { _id: ObjectId(programId) };
            const program = await programs.findOne(query);
            res.send(program)
        })

    }
    finally {
        // await client.close();
    }
}



run().catch(console.dir)

app.listen(port, () => {
    console.log('ok bro, we running port is ', port)
})