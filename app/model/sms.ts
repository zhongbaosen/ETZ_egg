
module.exports = app => {
    const { STRING, INTEGER,TEXT } = app.Sequelize;
  
    const Sms = app.model.define('etz_sms_information', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phone: {
        type:STRING(100),
        comment:"手机号"
      },
      random: {
        type:STRING(100),
        comment:"随机数"
      },
      content: {
        type:STRING(500),
        comment:"短信内容"
      },
      send_date: {
        type:STRING(23),
        comment:"发送时间"
      },
      receive_date: {
        type:STRING(23),
        comment:"接收时间" 
      },
      type: {
        type:STRING(50),
        comment:"类别" 
      },
      status: {
        type:STRING(20),
        comment:"类别"
      },
      enter_person: {
        type:STRING(50),
        comment:"录入人"
      },
      enter_time: {
        type:STRING(23),
        comment:"录入时间"
      },
      remark:{
        type:TEXT,
        comment:"备注"
      }
    },
    {
      tableName: 'etz_sms_information',  //一定要设置表名，不然有重复的表会建成其他名字
      timestamps: false  //是否增加created_at,updated_at
    }
  );

    // Country.showList = async function(){
    //   const result = await this.findAll();
    //   return result || {};
    // }
  
    return Sms;
  };