import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/api/v1/getcountry', controller.country.getCountry);
  router.post('/api/v1/createinfo',controller.user.create);
};
