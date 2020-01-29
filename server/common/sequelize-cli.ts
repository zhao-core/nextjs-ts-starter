import { Sequelize } from 'sequelize';
import { postgres } from '../config';

export const sequelizeClient = new Sequelize(postgres.db, postgres.user, postgres.password, {
  host: postgres.host,
  dialect: 'postgres', // 数据库类型：'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  pool: {
    max: 10000,
    min: 5,
    idle: 10000,
  },
});
