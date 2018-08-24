// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Country from '../../../app/controller/country';
import Home from '../../../app/controller/home';
import Telegram from '../../../app/controller/telegram';
import Upload from '../../../app/controller/upload';
import User from '../../../app/controller/user';
import Versionmanage from '../../../app/controller/versionmanage';

declare module 'egg' {
  interface IController {
    country: Country;
    home: Home;
    telegram: Telegram;
    upload: Upload;
    user: User;
    versionmanage: Versionmanage;
  }
}
