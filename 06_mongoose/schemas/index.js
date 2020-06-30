const mongoose = require('mongoose');

module.exports = () => {

  const connect = () => {

    if (process.env.MODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }

    mongoose.connect('mongodb://malrang:1234@cluster0-shard-00-00.un3bx.mongodb.net:27017,cluster0-shard-00-01.un3bx.mongodb.net:27017,cluster0-shard-00-02.un3bx.mongodb.net:27017/admin?ssl=true&replicaSet=atlas-oj4los-shard-0&authSource=admin&retryWrites=true&w=majority', {
      dbName: 'nodejs',
    }, (err) => {
      if (err) {
        console.error('디비 연결 에러', err);
      } else {
        console.log('디비 연결 성공');
      }
    })
  };

  connect();

  mongoose.connection.on('error', (err) => {
    console.error('디비 연결 에러', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('디비 연결 끊김. 재연결 시도');
    connect();
  });

  require('./user');
  require('./comment');
};