"use strict";
/** 为 Article 增加 realTimeHotValue 字段（PM 需求交付台自动生成） */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Articles", "realTimeHotValue", { type: Sequelize.FLOAT, allowNull: true });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn("Articles", "realTimeHotValue");
  },
};
