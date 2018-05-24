import { Status, Moment } from '../utils';
/**
 * 推荐表model
 */
module.exports = app => {
  const { STRING, INTEGER, DECIMAL } = app.Sequelize;

  const Recommend = app.model.define('etz_recommend_record', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phone: {
      type: STRING(100),
      comment: "下载人的手机号"
    },
    phone_address: {
      type: STRING(100),
      comment: "下载人地址"
    },
    phone_coin: {
      type: DECIMAL(23, 10),
      comment: "下载人得到的etz"
    },
    recommend_phone: {
      type: STRING(50),
      comment: "推荐人的手机号"
    },
    recommend_address: {
      type: STRING(100),
      comment: "推荐人地址"
    },
    recommend_coin: {
      type: DECIMAL(23, 10),
      comment: "推荐人得到的etz"
    },
    invite_code: {
      type: STRING(20),
      comment: "关联的邀请码"
    },
    status: {
      type: STRING(20),
      comment: "状态"
    },
    enter_person: {
      type: STRING(50),
      comment: "录入人"
    },
    enter_time: {
      type: STRING(23),
      comment: "录入时间"
    }
  },
    {
      tableName: 'etz_recommend_record',
      timestamps: false
    }
  );

  Recommend.showList = async function () {
    const result = await this.findAll();
    return result || {};
  }

  Recommend.insert = async function (data) {
    const { phone, phone_address, phone_coin, recommend_phone, recommend_address, recommend_coin, status, tran } = data
    const result = await this.bulkCreate([
      {
        phone: phone,
        phone_address: phone_address,
        phone_coin: phone_coin,
        recommend_phone: recommend_phone,
        recommend_address: recommend_address,
        recommend_coin: recommend_coin,
        status: status,
        enter_person: 'System',
        enter_time: Moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ], { transaction: tran });

    return {
      ...Status(201, result)
    }
  }

  Recommend.insertat = async function (data) {
    const { phone_address,code, phone_coin, recommend_address, recommend_coin, status, tran } = data
    const result = await this.bulkCreate([
      {
        phone_address: phone_address,
        phone_coin: phone_coin,
        recommend_address: recommend_address,
        recommend_coin: recommend_coin,
        invite_code:code,
        status: status,
        enter_person: 'System',
        enter_time: Moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ], { transaction: tran });

    return {
      ...Status(201, result)
    }
  }

  Recommend.updatail = async function (data) {
    const { phone_coin, code, recommend_coin, status, tran } = data
    const result = await this.update(
      {
        phone_coin: phone_coin,
        recommend_coin: recommend_coin,
        status: status
      }, {
        where: {
          invite_code: code
        }, transaction: tran
      });

    return {
      ...Status(201, result)
    }
  }



  return Recommend;
};