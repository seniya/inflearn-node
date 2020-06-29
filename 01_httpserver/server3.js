const http = require('http');
const fs = require('fs');
/*
const parseCookies = (cookie = '') => {
  cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
}
*/
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});


const server = http.createServer((req, res) => {
  console.log(req.url)
  console.log(parseCookies(req.headers.cookie));
  res.writeHead(200, {
    'Set-Cookie': 'mycookie=test'
  });

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