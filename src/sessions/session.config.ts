import { ConnectMongoOptions } from 'connect-mongo/build/main/lib/MongoStore';
export default {
  mongoUrl: process.env.MONGO_URI,
  dbName: 'chat-app',
} as ConnectMongoOptions;
