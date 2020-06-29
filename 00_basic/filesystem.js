const fs = require('fs');

// readFile, writeFile 비동기
// readFileSync, writeFileSync 동기
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
})

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString());
})

fs.readFile('./readme.txt', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
})

fs.writeFile('./writeme.txt', '파일쓰기 테스트', (err) => {
  if (err) {
    throw err;
  }

  fs.readFile('./writeme.txt', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
  })
})



let data = fs.readFileSync('./readme.txt', 'utf-8');
console.log('readFileSync : ', data);