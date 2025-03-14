import { Request, Response } from "express";
import { Model } from "mongoose";

class BaseController<T> {
    model: Model<T>;
    constructor(model: any) {
        this.model = model;
    }

    async getAll(req: Request, res: Response) {
        const userFilter = req.query.user;
        const postFilter = req.query.post;
        try {
            if (userFilter) {
                const item = await this.model.find({ user: userFilter });
                if (item) {
                    res.send(item);
                } else {
                    res.send(null);
                }
            } else if (postFilter) {
                const item = await this.model.find({ post: postFilter });
                if (item) {
                    res.send(item);
                } else {
                    res.send(null);
                }
            } else {
                const items = await this.model.find();
                res.send(items);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    };

    async getById(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const item = await this.model.findById(id);
            if (item != null) {
                res.send(item);
            } else {
                res.status(404).send("not found");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    };

    async create(req: Request, res: Response) {
        const body = req.body;
        try {
            const item = await this.model.create(body);
            res.status(201).send(item);
        } catch (error) {
            res.status(400).send(error);
        }
    };

    async updateItem(req: Request, res: Response) {
        const id = req.params.id;
        const updateData = req.body;
        try {
            const updatedItem = await this.model.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedItem) {
                return res.status(404).send({ message: 'Item not found' });
            }
            res.status(200).send(updatedItem);
        } catch (error) {
            res.status(400).send(error);
        }
    };

    async deleteItem(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const rs = await this.model.findByIdAndDelete(id);
            res.status(200).send(rs);
        } catch (error) {
            res.status(400).send(error);
        }
    };

}


export default BaseController