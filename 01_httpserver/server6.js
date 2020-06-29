const http = require('http');
const fs = require('fs');

const users = {

};

const server = http.createServer((req, res) => {

  if (req.method === 'GET') {
    if (req.url === '/') {
      return fs.readFile('../99_front_css/restFront.html', (err, data) => {
        res.end(data);
      });
    } else if (req.url === '/users') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      return res.end(JSON.stringify(users));
    }
    return fs.readFile(`../99_front_css/${req.url}`, (err, data) => {
      return res.end(data);
    });
  } else if (req.method === 'POST') {
    if (req.url === '/') {

    } else if (req.url === '/users') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      });
      req.on('end', () => {
        console.log('POST 본문(body)', body);
        const { name } = JSON.parse(body);
        const id = +new Date();
        users[id] = name;
        console.log('Server users', users);
        res.writeHead(201, {
          'Content-Type': 'text/html; charset=utf-8'
        });
        res.end('사용자등록 성공');
      });
    }
  } else if (req.method === 'PATCH') {
    if (req.url === '/') {

    } else if (req.url === '/users') {

    }
  } else if (req.method === 'PUT') {
    if (req.url === '/') {

    } else if (req.url.startsWith('/users/')) {
      const id = req.url.split('/')[2];
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      });
      return req.on('end', () => {
        console.log('put', body);
        users[id] = JSON.parse(body).name;

        // res.writeHead(201, {
        //   'Content-Type': 'text/html; charset=utf-8'
        // });
        return res.end(JSON.stringify(users));
      });
    }
  } else if (req.method === 'DELETE') {
    if (req.url === '/') {

    } else if (req.url.startsWith('/users/')) {
      const id = req.url.split('/')[2];
      let body = '';
      req.on('data', (chunk) => {
        body += chunk
      });
      return req.on('end', () => {
        console.log('delete', body);
        delete users[id];
        return res.end(JSON.stringify(users));
      });
    }
  }




}).listen(8080, () => {
  console.log('8080 start');
});

server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기중입니다.')
})

server.on('error', (error) => {
  console.error(error)
})