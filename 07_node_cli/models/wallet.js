module.exports = (sequelize, Sequelize) => {
  return sequelize.define('wallet', {
    money: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: '금액',
    },
    desc: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: '금액',
    },
    type: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      comment: 'true면 수입, false면 지출',
    }
  }, {
    timestamps: true,
  });
}

// wallet 테이블
// 작성자, 댓글 내용, 생성일
// 말랭, 안녕하세요, 2020-06-25