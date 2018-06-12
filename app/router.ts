import { Application } from 'egg';
import api from './router/api';
import view from './router/view';

export default (app: Application) => {
    api(app);
    view(app);
};
