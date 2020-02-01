const express = require("express"); // the library we will use to handle requests
const MongoClient = require("mongodb").MongoClient;
const BodyParser = require("body-parser");
const port = 4567; // port to listen on
const DATABASE_NAME = "sample_training";
const app = express(); // instantiate express
app.use(require("cors")()); // allow Cross-domain requests
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
// make sure in the free tier of MongoDB atlas when connecting, to
// select version 2.2.* as the node.js driver instead of the default 3.0
// put your URI HERE ⬇
const uri = "mongodb://kukharets:Qq123456@metas-shard-00-00-b0gmc.gcp.mongodb.net:27017,metas-shard-00-01-b0gmc.gcp.mongodb.net:27017,metas-shard-00-02-b0gmc.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Metas-shard-0&authSource=admin&retryWrites=true&w=majority"; // put your URI HERE
var database, collection;
// connect to your MongoDB database through your URI.
// The connect() function takes a uri and callback function as arguments.
app.listen(3000, () => {
    MongoClient.connect("mongodb://kukharets:Qq123456@metas-shard-00-00-b0gmc.gcp.mongodb.net:27017,metas-shard-00-01-b0gmc.gcp.mongodb.net:27017,metas-shard-00-02-b0gmc.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Metas-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("trips");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});
app.get("/bikes", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
