
module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const User = app.model.define('etz_userinfo', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        phone: {
            type: STRING(100),
            comment: "手机号"
        },
        receive_address: {
            type: STRING(100),
            comment: "空投地址"
        },
        country: {
            type: STRING(20),
            comment: "国家"
        },
        country_code: {
            type: STRING(20),
            comment: "国家码"
        },
        invite_code: {
            type: STRING(20),
            comment: "邀请码"
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
            tableName: 'etz_userinfo',  //一定要设置表名，不然有重复的表会建成其他名字
            timestamps: false  //是否增加created_at,updated_at
        }
    );

    User.showList = async function () {
        const result = await this.findAll();
        return result || {};
    }

    User.findC = async function (country_code) {
        var res = await app.model.country.findCode(country_code);
        console.log(res);
        return res || {};
    }

    User.insert = async function (data) {
        const { phonenum, receiveaddress, random, country,countrycode } = data;
        const result = await this.bulkCreate([
            {
                phone: phonenum,
                receive_address: receiveaddress,
                invite_code:random,
                country:country,
                country_code:countrycode,
                enter_person:'System',
                enter_time:'2018-5-11 11:52:38'
            }
        ]);
        return result || {};
    }

    return User;
};