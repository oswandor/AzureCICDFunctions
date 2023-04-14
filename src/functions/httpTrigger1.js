const { app } = require('@azure/functions');
const { MongoConnectionString } = require('./MongoConnectionDB');

class BookStore {
  constructor() {
    this.mongodbConnection = new MongoConnectionString('mongodb://127.0.0.1:27017/', 'BookStore', 'Books');
  }

  async listBooks(request, response) {
    const collection = await this.mongodbConnection.getCollection();
    const books = await collection.find({}).toArray();
    const responseJson = JSON.stringify(books);
    await this.mongodbConnection.close();
    return { body: responseJson };
  }

  async createBook() {
    const collection = await this.mongodbConnection.getCollection();
    const document = {
      Name: "CRUD Patterns",
      Price: 54.93,
      Category: "Computers",
      Author: "Ralph Johnson"
    };
    const result = await collection.insertOne(document);
    await this.mongodbConnection.close();
    return { body: result.insertedCount };
  }
}

const bookStore = new BookStore();

app.http('listBooks', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: (request, response) => bookStore.listBooks(request, response)
});

app.http('createBooks', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: (context, req) => bookStore.createBook()
});
