import { Db, MongoClient, ObjectId } from 'mongodb';
import config from '../config/index';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME: string = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

export default class MongoLib {
  private _client: MongoClient;
  private _dbName: string;
  static connection: Promise<Db> | null = null;

  public constructor() {
    this._client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this._dbName = DB_NAME;
    this._connect();
  }

  private _connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this._client.connect((err) => {
          if (err) {
            reject(err);
          }

          console.log('[MongoDB] Connected');
          resolve(this._client.db(this._dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  public async getAll(collection: string, query?: object) {
    return this._connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  public async get(collection: string, id: string) {
    return this._connect().then((db) => {
      return db.collection(collection).findOne({ _id: new ObjectId(id) });
    });
  }

  public async create(collection: string, data: Object) {
    return this._connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  public async update(collection: string, id: string, data: Object) {
    return this._connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne(
            { _id: new ObjectId(id) },
            { $set: data },
            { upsert: true },
          );
      })
      .then((result) => result.upsertedId || id);
  }

  public async remove(collection: string, id: string) {
    return this._connect()
      .then((db) => {
        db.collection(collection).deleteOne({ _id: new ObjectId(id) });
      })
      .then(() => id);
  }
}
