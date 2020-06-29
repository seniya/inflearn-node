const crypto = require('crypto');

// 단방향 암호화: 복호화 할수 없다. (비밀번호 충돌 위험.. 다른 문자 같은 암호)
const pw = crypto.createHash('sha512').update('비밀번호').digest('base64');
console.log('pw1 : ', pw);


// 비밀번호 충돌 위험 X. salt 이용
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  console.log('salt', salt);
  console.time('암호화');
  crypto.pbkdf2('비밀번호', salt, 213549, 64, 'sha512', (err, key) => {
    console.log('pw2 : ', key.toString('base64'));
    console.timeEnd('암호화');
  })
})

// 그외
// bcrypt, scrypt 이용