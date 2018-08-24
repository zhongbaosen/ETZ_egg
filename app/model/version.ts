
//国家码表model
module.exports = app => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;

    const Version = app.model.define('etz_version_information', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        appname: {
            type: STRING(20),
            comment: "应用名称"
        },
        platform: {
            type: STRING(50),
            comment: "平台"
        },
        version: {
            type: STRING(20),
            comment: "版本"
        },
        versiontype: {
            type: STRING(50),
            comment: "版本类别"
        },
        type: {
            type: STRING(50),
            comment: "类型"
        },
        size: {
            type: STRING(50),
            comment: "大小"
        },
        url: {
            type: STRING(255),
            comment: "下载地址"
        },
        content: {
            type: TEXT,
            comment: "版本内容"
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
        },
        remark: {
            type: TEXT,
            comment: "备注"
        }
    },
        {
            tableName: 'etz_version_information',
            timestamps: false
        }
    );

    Version.showList = async function (data) {
        const { platform,status } = data
        const result = await this.findAll({
            where: {
                platform: platform,
                status:status
            },
            order: [['version','DESC']],  //根据version倒序
            attributes: [  //(attributes)只返回这些字段的参数
                'appname','platform','versiontype','version','size','url','content',['enter_time','update_time']
            ], raw: true
        });

        return result || {};
    }

    Version.showFinal = async function (data) {
        const { platform,status } = data
        const result = await this.findOne({
            where: {
                platform: platform,
                status:status
            },
            order: [['version','DESC']],  //根据version倒序
            attributes: [  //(attributes)只返回这些字段的参数
                'appname','platform','versiontype','version','size','url','content',['enter_time','update_time']
            ], raw: true
        });

        return result || {};
    }

    Version.findCode = async function (data) {
        const { country_code } = data;
        const result = await this.findAll({
            where: {
                country_code: country_code
            }
        });
        return result || {};
    }

    Version.getLatestVersion = async function(){
      const result = await this.findOne({
          where :{
            id: 1
          },
          attributes: [
            ['versioncode','versionCode'],'version','url','content'
          ],raw: true
      })
      return result || {}
    }

    return Version;
};
