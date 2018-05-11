// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Country from '../../../app/service/Country';
import Test from '../../../app/service/Test';
import User from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    country: Country;
    test: Test;
    user: User;
  }
}
