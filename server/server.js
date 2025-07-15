import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';

// 📡 MongoDB Connection Setup
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// 🔥 Event untuk error koneksi
mongoose.connection.on('error', () => {
  throw new Error(`❌ Unable to connect to database: ${config.mongoUri}`);
});

// ✅ Event untuk koneksi sukses
mongoose.connection.once('open', () => {
  console.log(`✅ Connected to MongoDB at ${config.mongoUri}`);
});

// 🚀 Start Express Server
app.listen(config.port, (err) => {
  if (err) {
    console.log('❌ Server failed to start:', err);
  } else {
    console.info(`🚀 Server started on port ${config.port}.`);
  }
});