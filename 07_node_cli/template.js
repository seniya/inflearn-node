#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let rl;

let type = process.argv[2];
let name = process.argv[3];
let directory = process.argv[4] || '.';

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta chart="utf-8">
  <title>Template</title>
</head>
<body>
  <h1>Hello</h1>
  <p>CLI</p>
</body>
</html>
`;

const routerTemplate = `
const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
`;

const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (error) {
    return false;
  }
}

// html html/css/js/test  ->  ./css/js/test
const mkdirp = (dir) => {
  const dirname = path.relative('.', path.normalize(dir)).split(path.sep).filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  })

}



const makeTemplate = () => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다.');
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log('생성완료');
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다.');
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log('생성완료');
    }
  } else {
    console.error('무엇을 만들지 선택하시오');
  }
}

const dirAnswer = (answer) => {
  directory = (answer && answer.trim()) || '.';
  rl.close();
  makeTemplate();
}

const nameAnswer = (answer) => {
  if (!answer || !answer.trim()) {
    console.clear();
    console.log('name을 반드시 입력하셔야 합니다.');
    return rl.question('파일명을 설정하세요', nameAnswer);
  }
  name = answer;
  return rl.question('저장할 경로를 설정하세요(설정하지 않으면 현재경로)', dirAnswer);
}

const typeAnswer = (answer) => {
  if (answer !== 'html' && answer !== 'express-router') {
    console.clear();
    console.error('html 또는 express-router 만 지원합니다.');
    return rl.question('어떤 템플릿이 필요하십니까?', typeAnswer);
  }
  type = answer;
  return rl.question('파일명을 설정하세요', nameAnswer);
}

const program = () => {

  if (!type || !name) {
    // console.error('사용방법: cli html|express-router 파일명 | [생성경로]');
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.clear();
    rl.question('어떤 템플릿이 필요하십니까?', typeAnswer);
  } else {
    makeTemplate();
  }
};

program();