import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelizeClient } from '../common/sequelize-cli';
import cacher from 'sequelize-redis-cache';
import { redisClient } from '../common/redis-cli';
import dayjs from 'dayjs';

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    openId: {
      type: DataTypes.STRING,
      field: 'open_id',
    },
    describe: DataTypes.STRING,
    status: DataTypes.INTEGER,
    lv: DataTypes.INTEGER,
    token: DataTypes.STRING,
    birthday: DataTypes.DATE,
    createTime: {
      type: DataTypes.DATE,
      get() {
        return dayjs(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: DataTypes.NOW,
      field: 'create_time',
    },
    updateTime: {
      type: DataTypes.DATE,
      get() {
        return dayjs(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: DataTypes.NOW,
      field: 'update_time',
    },
  },
  { sequelize: sequelizeClient, modelName: 'User', tableName: 'tb_users' }
);

export const UserCache = cacher(sequelizeClient, redisClient)
  .model('User')
  .ttl(60 * 60 * 24);

  (async () => {
    await User.sync();
    // const jane = await User.create({
    //   username: 'janedoe',
    //   birthday: new Date(1980, 6, 20),
    // });
    // console.log(jane.toJSON());
  })();