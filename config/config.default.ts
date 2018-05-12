import { EggAppConfig, PowerPartial } from 'egg';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
}

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525776408250_528';

  // add your config here
  config.middleware = [];

  //安全协议
  config.security = {
    csrf:{
      enable: false //安全协议(false:关闭,true:开启)
    }
  };

  config.sequelize = {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'etz',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: 'etz.123456',
  };

  config.alisms = {
    AccessKeyID:'LTAICx70Wo8k8l2z',
    AccessKeySecret:'raLLvOZ9XgkqYM5UFQeXRef5ISFtpL',
    SignName:'阿里云短信测试专用',
    TemplateCode:{
      GET_SMS_CODE:['SMS_131340057','绑定地址验证码'] //获取短信验证码模板ID  验证码${code}，您正在尝试变更重要信息，请妥善保管账户信息。
    }
  }

  return config;
};
