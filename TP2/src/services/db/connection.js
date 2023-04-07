const { MongoClient } = require('mongodb');
const conf = require("../../../conf.json")
const { addLog } = require("../logs/logs");
// Connection URI
const url = conf.databaseUrl;
const dbName = conf.databaseName;

// Create a new MongoClient
const client = new MongoClient(url);

/**
 * Connect to the database
 */
async function connectTodB() {
    try {
        addLog("info", "Trying to access the db...", "connection.js")
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Establish and verify connection
        await client.db('admin').command({ ping: 1 });
        addLog("info", "Connected successfully to server", "connection.js")
    } catch (e) {
        // Ensures that the client will close when you finish/error
        addLog("error", e, "connection.js")
        await client.close();
        throw e;
    }
}

function getCollection(collectionName) {
    return client.db(dbName).collection(collectionName);
}

module.exports = {
    connectTodB,
    getCollection,
};