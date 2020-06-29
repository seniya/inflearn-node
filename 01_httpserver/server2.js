const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('서버 실행');
  // console.log('req : ', req);
  // console.log('res : ', res);
  fs.readFile('../99_front_css/rs-nav.html', (err, data) => {
    if (err) {
      throw (err);
    }
    // 버퍼데이터 알아서 브라우저가 처리
    res.end(data);
  });
}).listen(8080, () => {
  console.log('8080 start');
});

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기중입니다.')
})

server.on('error', (error) => {
  console.error(error)
})