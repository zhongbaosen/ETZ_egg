import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    router.get('/api/v1/upload', controller.upload.show);
    router.post('/api/v1/upload', controller.upload.upload);
}