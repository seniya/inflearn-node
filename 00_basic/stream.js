const fs = require('fs');

const readStream = fs.createReadStream('./stream.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);
  // console.log('data', chunk, chunk.length);
});

readStream.on('end', () => {
  // console.log('end data : ', data)
  //console.log('end buffer concat data : ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
  console.log('error', err);
});


// const writeStream = fs.createWriteStream('./stream2.txt');

// writeStream.on('finish', () => {
//   console.log('파일쓰기 완료');
// })

// writeStream.write('글을 씁니다.1\n');
// writeStream.write('글을 씁니다.2\n');
// writeStream.write('글을 씁니다.3');
// writeStream.end();


// const readStream2 = fs.createReadStream('./stream.txt');
// const writeStream2 = fs.createWriteStream('./stream2.txt');
// readStream2.pipe(writeStream2);

const readStream3 = fs.copyFile('./stream.txt', './stream2.txt', (err) => {
  console.log(err);
})
