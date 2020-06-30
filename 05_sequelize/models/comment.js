module.exports = (sequelize, DataTypes) => {
  return sequelize.define('comment', {
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    }
  }, {
    timestamps: false,
    underscored: true,
  });
}

// comment 테이블
// 작성자, 댓글 내용, 생성일
// 말랭, 안녕하세요, 2020-06-25