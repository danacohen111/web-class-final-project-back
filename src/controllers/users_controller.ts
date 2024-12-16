import { Request, Response } from 'express';
import BaseController from './base_controller';
import UserModel, { IUser } from '../models/users_model';

class UsersController extends BaseController<IUser> {
    constructor() {
        super(UserModel);
    }

}

export default new UsersController();