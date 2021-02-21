const MongoClient = require('mongodb').MongoClient;

class Database {
    constructor(clusterName, clusterId, database, user, password) {
        this.clusterName = clusterName;
        this.clusterId = clusterId;
        this.database = database;
        this.user = user;
        this.password = password;
        this.url = `mongodb+srv://${this.user}:${this.password}@${this.clusterName}.${this.clusterId}.mongodb.net/${this.database}?retryWrites=true&w=majority`;
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = Object.freeze(new Database(
                process.env.DB_CLUSTER_NAME,
                process.env.DB_CLUSTER_ID,
                process.env.DB_NAME,
                process.env.DB_USER,
                process.env.DB_PASSWORD
            ));
        }
        return this.instance;
    }

    async getConnection() {
        const client = new MongoClient(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return client.connect();
    }

    async loadCollection(collection) {
        const connection = await this.getConnection();
        return connection.db(this.database).collection(collection);
    }

    async getCollection(collectionName, filter) {
        const collection = await this.loadCollection(collectionName);
        return collection.find(filter || {}).toArray();
    }

    async postDocument(collectionName, document) {
        const collection = await this.loadCollection(collectionName);
        return collection.insertOne(document);
    }
}

module.exports = Database;
