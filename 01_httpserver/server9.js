const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
const http = require('http');
const fs = require('fs');

if (cluster.isMaster) {
  console.log('마스터 프로세스 아이디', process.pid);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, sigal) => {
    console.log(worker.process.pid, '워커가 종료됩니다.');
    // cluster.fork();
  })
} else {
  const server = http.createServer(
    (req, res) => {
      res.end(`<p> ${process.pid} hello Server</p>`);
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }).listen(8080, () => {
      console.log('8080 start');
    });
  console.log(process.pid, '워커실행')
}

/*
for (let i = 0; i < numCPUs; i++) {
  console.log(`서버 ${i} 실행`)
  const server = http.createServer(
    (req, res) => {
      console.log('start server');
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
}


*/