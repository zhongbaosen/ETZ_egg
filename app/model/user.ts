
import { Status, StatusCode, Moment } from '../utils';
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

    User.checkCode = async function (data) {
        const { invite_code } = data
        const resA = await this.findOne({
            where: {
                invite_code: invite_code
            }
        })

        if (!resA) {
            return {
                ...Status(600, StatusCode.RANDOM_IS_NOTEXISTED)
            }
        }

        return {
            ...Status(201, resA)
        };

    }

    User.check = async function (data) {
        const { phonenum, receiveaddress } = data
        const resA = await this.findOne({
            where: {
                phone: phonenum
            }
        })

        if (resA) {
            return {
                ...Status(600, StatusCode.PHONE_IS_EXISTED)
            }
        }

        const resB = await this.findOne({
            where: {
                receive_address: receiveaddress
            }
        })

        if (resB) {
            return {
                ...Status(600, StatusCode.RECEIVE_ADDRESS_EXISTED)
            }
        }


        return {
            ...Status(201, null)
        };
    }

    User.insert = async function (data) {
        const { phonenum, receiveaddress, random, country, countrycode,tran } = data;
        const result = await this.bulkCreate([
            {
                phone: phonenum,
                receive_address: receiveaddress,
                invite_code: random,
                country: country,
                country_code: countrycode,
                enter_person: 'System',
                enter_time: Moment().format('YYYY-MM-DD HH:mm:ss')
            }
        ],{transaction: tran});
        return result || {};
    }

    User.findinfo = async function (data) {
        const { address } = data;
        const result = await this.findOne({
            where: {
                receive_address: address
            },
            attributes: [  //(attributes)只返回这些字段的参数
                'phone',
                ['receive_address', 'address'], //第一个参数是表的字段名，第二个是输出的字段名(类似xxx as yyy)
                'country',
                ['invite_code', 'invitecode']
            ]
        });

        if (!result) {  //没有数据时是null值
            return {
                ...Status(600, StatusCode.NO_DATE_IS_QUERY)
            }
        }

        return {
            ...Status(201, result.dataValues)
        }
    }

    User.findcode = async function (data) {
        const { random } = data;
        const result = await this.findOne({
            where: {
                invite_code: random
            },
            attributes: [  //(attributes)只返回这些字段的参数
                'phone',
                ['receive_address', 'address'], //第一个参数是表的字段名，第二个是输出的字段名(类似xxx as yyy)
                'country',
                ['invite_code', 'invitecode']
            ]
        });

        if (!result) {  //没有数据时是null值
            return {
                ...Status(600, StatusCode.NO_DATE_IS_QUERY)
            }
        }

        return {
            ...Status(201, result.dataValues)
        }

        // return result || {};
    }

    return User;
};