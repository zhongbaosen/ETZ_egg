import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    router.get('/', controller.home.index);
    router.get('/api/v1/versionCheck',controller.versionmanage.versionCheck1)
    router.post('/api/v1/getcountry', controller.country.getCountry);
    router.post('/api/v1/createinfo', controller.user.create);
    router.post('/api/v1/showinfo', controller.user.isShow);
    router.post('/api/v1/sendsms', controller.user.sendSms);
    router.post('/api/v1/bindwallet', controller.telegram.res);
    router.post('/api/v1/showinvite', controller.telegram.show);
    router.post('/api/v1/showappinfo', controller.user.OpenETZinfo);
}