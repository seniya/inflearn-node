const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
// const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

const MONGO_URL = 'mongodb://malrang:1234@cluster0-shard-00-00.un3bx.mongodb.net:27017,cluster0-shard-00-01.un3bx.mongodb.net:27017,cluster0-shard-00-02.un3bx.mongodb.net:27017/admin?ssl=true&replicaSet=atlas-oj4los-shard-0&authSource=admin&retryWrites=true&w=majority';

module.exports = () => {
  const connect = () => {
    if (NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.connect(MONGO_URL, {
      dbName: 'nodechat',
    }, (error) => {
      if (error) {
        console.log('몽고디비 연결 에러', error);
      } else {
        console.log('몽고디비 연결 성공');
      }
    });
  };
  connect();

  mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
  });

  require('./chat');
  require('./room');
};