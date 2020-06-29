const util = require('util');
const crypto = require('crypto');

// util.deprecate
const sum = (x, y) => {
  console.log(x + y);
};

const sum2 = util.deprecate((x, y) => {
  console.log(x + y);
}, 'warning')

sum(1, 2);
sum2(1, 2);

// util.promisify
const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  console.log('salt', salt);
  console.time('암호화');
  crypto.pbkdf2('비밀번호', salt, 213549, 64, 'sha512', (err, key) => {
    console.log('pw2 : ', key.toString('base64'));
    console.timeEnd('암호화');
  })
})


randomBytesPromise(64)
  .then((buf) => {
    const salt = buf.toString('base64');
    return pbkdf2Promise('비밀번호', salt, 213549, 64, 'sha512');
  })
  .then((key) => {
    console.log('pw3 : ', key.toString('base64'));
  })
  .catch((err) => {
    console.error(err);
  });

(async () => {
  const buf = await randomBytesPromise(64);
  const salt = buf.toString('base64');
  const key = await pbkdf2Promise('비밀번호', salt, 213549, 64, 'sha512');
  console.log('pw4 : ', key.toString('base64'));
})();