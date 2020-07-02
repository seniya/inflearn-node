#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const { version } = require('./package.json');
const { sequelize, Wallet } = require('./models');

program
  .version(version, '-v, --version')
  .usage('[options]');

const addMoney = async (money, desc) => {
  await sequelize.sync();
  await Wallet.create({
    money: parseInt(money, 10),
    desc,
    type: true,
  });
  console.log(chalk.bold.green(`${money} 원을 얻었습니다.`));
  await sequelize.close();
};

const removeMoney = async (money, desc) => {
  await sequelize.sync();
  await Wallet.create({
    money: parseInt(money, 10),
    desc,
    type: false,
  });
  console.log(chalk.bold.green(`${money} 원을 사용하였습니다.`));
  await sequelize.close();
}

const totalMoney = async () => {
  await sequelize.sync();
  const logs = await Wallet.findAll({});
  const revenue = logs.filter(l => l.type === true).reduce((acc, cur) => acc + cur.money, 0);
  const expense = logs.filter(l => l.type === false).reduce((acc, cur) => acc + cur.money, 0);
  console.log(chalk.green(`총 수입 ${revenue} 원`));
  console.log(chalk.green(`총 지출 ${expense} 원`));
  console.log(chalk.bold.green(`잔액은 ${revenue - expense} 원 입니다.`));
  await sequelize.close();
}

//수입
program
  .command('revenue <money> <desc>')
  .usage('<money> <desc>')
  .description('수입 항목 추가')
  .action((money, desc) => {
    addMoney(money, desc);
  });

//지출
program
  .command('expense <money> <desc>')
  .usage('<money> <desc>')
  .description('지출 항목 추가')
  .action((money, desc) => {
    removeMoney(money, desc);
  });

//잔액
program
  .command('balance')
  .usage('<name> <directory>')
  .description('잔액')
  .action(async () => {
    totalMoney();
  });

// 기타 접근(......)
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
          message: '종류를 선택하세요.',
          choices: ['수입', '지출', '잔액'],
        }, {
          type: 'input',
          name: 'money',
          message: '금액을 입력하세요',
          default: '0',
          when: answers => ['수입', '지출'].includes(answers.type),
        }, {
          type: 'input',
          name: 'desc',
          message: '설명을 입력하세요',
          default: '...',
          when: answers => ['수입', '지출'].includes(answers.type),
        }, {
          type: 'confirm',
          name: 'confirm',
          message: '생성하시겠습니까?'
        }
      ])
        .then((answer) => {
          if (answer.confirm) {
            if (answer.type === '수입') {
              addMoney(answer.money, answer.desc);
            } else if (answer.type === '지출') {
              removeMoney(answer.money, answer.desc);
            } else if (answer.type === '잔액') {
              totalMoney();
            }
            console.log(chalk.bold.green('터미널을 종료합니다.'));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  })


program.parse(process.argv);