const http = require('http');
const fs = require('fs');

const users = {

};

const router = {
  GET: {
    '/': (req, res) => {
      fs.readFile('../99_front_css/restFront.html', (err, data) => {
        res.end(data);
      });
    },
    '/users': (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(JSON.stringify(users));
    },
    '*': (req, res) => {
      fs.readFile(`../99_front_css/${req.url}`, (err, data) => {
        return res.end(data);
      });
    }
  },
  POST: {
    '/': (req, res) => {

    },
    '/users': (req, res) => {
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
    },
  },
  PUT: {
    '/': (req, res) => {

    },
    '/users': (req, res) => {
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
    },
  },
  PATCH: {
    '/': (req, res) => {

    },
    '/users': (req, res) => {

    },
  },
  DELETE: {
    '/': (req, res) => {

    },
    '/users': (req, res) => {
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
    },
  }
}

const server = http.createServer((req, res) => {

  const matchedUrl = router[req.method][req.url];
  if (matchedUrl === undefined) {
    router[req.method]['*'](req, res);
  } else {
    matchedUrl(req, res);
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