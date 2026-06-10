"use strict";
/** 为 Article 增加 viewCount 字段（PM 需求交付台自动生成） */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Articles", "viewCount", { type: Sequelize.INTEGER, allowNull: true });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn("Articles", "viewCount");
  },
};
