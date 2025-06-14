const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
// Database :- mongosh
const mongoURI =
  "mongodb://127.0.0.1:27017/blogWorld?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.4";

const connectToMongo = async() => {
  try {
    await mongoose.connect(mongoURI, (error) => {
        console.log("Connect Successfully to MongoDB blogWorld Database");
      });
  } catch (error) {
    console.log(error);
  }
};

const connectToMongoDB = () => {
  try {
    const client = new MongoClient(mongoURI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    client.connect().then((res, rej) => {
      if (res) console.log("Connect to Successfully");
      else console.log("Falied to Successflly");
    });
  } catch (error) {
    console.log(error);
  }
};

// connectToMongoDB();
module.exports = connectToMongo;
