const http = require('http');
const https = require('https');
const http2 = require('http2');
const fs = require('fs');

const server = https.createServer({
  cert: '',
  key: '',
  ca: [
    '',
    '',
    '',
  ]
},
  (req, res) => {
    console.log('서버 실행');
    res.write('<h1>hello node</h1>');
    res.end('<p>hello Server</p>');
  }).listen(443, () => {
    console.log('8080 start');
  });

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기중입니다.')
})

server.on('error', (error) => {
  console.error(error)
})