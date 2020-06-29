const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('서버 실행');
  res.write('<h1>hello node</h1>');
  res.end('<p>hello Server</p>');
}).listen(8080, () => {
  console.log('8080 start');
});

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기중입니다.')
})

server.on('error', (error) => {
  console.error(error)
})