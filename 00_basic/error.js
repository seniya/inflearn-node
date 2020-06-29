const fs = require('fs');
/*
setInterval(() => {
  // console.log('시작');

  fs.unlink('./aaaaaaa.fs', (err) => {
    if (err) {
      console.log('시작');
      console.log(err);
      console.log('끝');
    }
  })

  // try {
  //   throw new Error('에러발생')
  // } catch (error) {
  //   console.error(error);
  // }

}, 1000)

*/

process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
})

setInterval(() => {
  throw new Error('에러발생')
}, 1000)

setTimeout(() => {
  console.log('실행됩니다.')
}, 2000);