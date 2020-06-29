const crypto = require('crypto');

// 양방향 암호화
const cipher = crypto.createCipher('aes-256-cbc', '열쇠');
let result = cipher.update('비밀번호', 'utf8', 'base64');
result = result + cipher.final('base64');

console.log('pw :', result);

const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');
let result2 = decipher.update(result, 'base64', 'utf8');
result2 = result2 + decipher.final('utf8');

console.log('pw2 :', result2);