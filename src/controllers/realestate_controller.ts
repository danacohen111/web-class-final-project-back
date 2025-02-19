import { Request, Response } from "express";
import RealestateModel, { IRealestate } from "../models/realestate_model";
import BaseController from "./base_controller";
import { Model } from "mongoose";

class RealestateController extends BaseController<IRealestate> {
    constructor() {
        super(RealestateModel);
    }

}

export default new RealestateController();