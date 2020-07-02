#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

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

const makeTemplate = (type, name, directory) => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다.'));
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(chalk.bold.green('생성완료'));
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error(chalk.bold.red('이미 해당 파일이 존재합니다.'));
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(chalk.bold.green('생성완료'));
    }
  } else {
    console.error(chalk.bold.red('무엇을 만들지 선택하시오'));
  }
}

const copyFile = (name, directory) => {
  if (exist(name)) {
    mkdirp(directory);
    fs.copyFileSync(name, path.join(directory, name));
    console.log(chalk.bold.green(`${name} 파일이 복사되었습니다.`));
  } else {
    console.error(chalk.bold.red('파일이 존재하지 않습니다.'));
  }
}

const rimraf = (p) => {
  if (exist(p)) {
    try {
      const dir = fs.readdirSync(p);
      console.log(dir);
      dir.forEach((d) => {
        rimraf(path.join(p, d));
      })
      fs.rmdirSync(p);
      console.log(chalk.bold.green(`${p} 폴더를 삭제하였습니다.`));
    } catch (e) {
      fs.unlinkSync(p);
      console.log(chalk.bold.green(`${p} 파일을 삭제하였습니다.`));
    }
  } else {
    console.error(chalk.bold.red('파일 또는 폴더가 존재하지 않습니다.'));
  }
}

program
  .version('0.0.1', '-v, --version')
  .usage('[options]');


program
  .command('template <type>')
  .usage('--name <name> --path [path]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-fn, --fname <fname>', '파일명을 입력하세요.', 'index')
  .option('-d, --directory [path]', '생성 경로를 입력하세요', '.')
  .action((type, options) => {
    //console.log(type, options.fname, options.directory);
    makeTemplate(type, options.fname, options.directory);
  });

program
  .command('copy <name> <directory>')
  .usage('<name> <directory>')
  .description('파일을 복사합니다.')
  .action((name, directory) => {
    copyFile(name, directory);
  });

program
  .command('rimraf <path>')
  .usage('<path>')
  .description('폴더와 파일을 삭제합니다.')
  .action((path) => {
    rimraf(path);
  });

program
  .action((cmd, args) => {
    if (args) {
      console.log('해당 명령어를 찾을 수 없습니다.');
      program.help();
    } else {
      inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: '템플릿 종류를 선택하세요.',
          choices: ['html', 'express-router'],
        }, {
          type: 'input',
          name: 'fname',
          message: '파일의 이름을 입력하세요',
          default: 'index'
        }, {
          type: 'input',
          name: 'directory',
          message: '디렉토리 이름을 입력하세요',
          default: '.'
        }, {
          type: 'confirm',
          name: 'confirm',
          message: '생성하시겠습니까?'
        }
      ])
        .then((answer) => {
          if (answer.confirm) {
            makeTemplate(answer.type, answer.fname, answer.directory);
            console.log(chalk.bold.green('터미널을 종료합니다.'));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  })

program.parse(process.argv);
