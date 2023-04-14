// importamos mongodb client 
const { MongoClient } = require('mongodb');

class MongoConnectionString {

  constructor(urlConnectionString, dbName, collectionName) {
    // datos necesarios para la conexión a MongoDB 
    this.urlConnectionString = urlConnectionString;
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.client = null; // agregamos una propiedad para el cliente de MongoDB
  }

  async connect() {
    // se conecta a la base de datos MongoDB   
    this.client = new MongoClient(this.urlConnectionString);
    // conexión al cliente 
    await this.client.connect();
    // devolvemos el cliente
    return this.client;
  }

  async getCollection() {
    if (!this.client || !this.client.isConnected()) {
      // si el cliente aún no se ha conectado, lo conectamos
      await this.connect();
    }
    let db = this.client.db(this.dbName);
    let collection = db.collection(this.collectionName);
    // retornamos la colección
    return collection;
  }

  async close() {
    // cerramos la conexión del cliente
    await this.client.close();
  }
}

module.exports = { MongoConnectionString };
