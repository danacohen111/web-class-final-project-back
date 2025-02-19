import express, { Request, Response } from 'express';
import realestateController from '../controllers/realestate_controller';
import { authMiddleware } from '../controllers/auth_controller';

const router = express.Router();

/**
 * @swagger
 * /realestate:
 *   get:
 *     summary: Get all realestate
 *     description: Retrieve all realestate or filter by owner
 *     tags: [realestate]
 *     parameters:
 *       - in: query
 *         name: owner
 *         schema:
 *           type: string
 *         description: The ID of the owner to filter realestate by
 *     responses:
 *       200:
 *         description: realestate retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   address:
 *                     type: string
 *                   owner:
 *                     type: mongoose.Schema.Types.ObjectId
 *                   description:
 *                     type: string
 *                    area:
 *                     type: string
 *                    location:
 *                     type: string
 *                   _id:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

router.get("/", realestateController.getAll.bind(realestateController));

/**
 * @swagger
 * /realestate/{id}:
 *   get:
 *     summary: Get a realestate by ID
 *     description: Retrieve a realestate by ID
 *     tags: [realestate]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The realestate ID
 *     responses:
 *       200:
 *         description: realestate retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   city:
 *                     type: string
 *                   address:
 *                     type: string
 *                   owner:
 *                     type: mongoose.Schema.Types.ObjectId
 *                   description:
 *                     type: string
 *                    area:
 *                     type: string
 *                    location:
 *                     type: string
 *                   _id:
 *                     type: string
 *       404:
 *         description: realestate not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", realestateController.getById.bind(realestateController));

/**
 * @swagger
 * /realestate:
 *   realestate:
 *     summary: Create a new realestate
 *     description: Create a new realestate
 *     tags: [realestate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   city:
 *                     type: string
 *                   address:
 *                     type: string
 *                   owner:
 *                     type: mongoose.Schema.Types.ObjectId
 *                   description:
 *                     type: string
 *                    area:
 *                     type: string
 *                    location:
 *                     type: string
 *                   _id:
 *                     type: string
 *     responses:
 *       201:
 *         description: realestate created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   city:
 *                     type: string
 *                   address:
 *                     type: string
 *                   owner:
 *                     type: mongoose.Schema.Types.ObjectId
 *                   description:
 *                     type: string
 *                    area:
 *                     type: string
 *                    location:
 *                     type: string
 *                   _id:
 *                     type: string
 *       401:
 *         description: Access denied
 *       500:
 *         description: Internal server error
 */

router.post("/", authMiddleware, realestateController.create.bind(realestateController));

/**
 * @swagger
 * /realestate/{id}:
 *   put:
 *     summary: Update a realestate by ID
 *     description: Update a realestate by ID
 *     tags: [realestate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The realestate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   city:
 *                     type: string
 *                   address:
 *                     type: string
 *                   owner:
 *                     type: mongoose.Schema.Types.ObjectId
 *                   description:
 *                     type: string
 *                    area:
 *                     type: string
 *                    location:
 *                     type: string
 *                   _id:
 *                     type: string
 *     responses:
 *       200:
 *         description: realestate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   city:
 *                     type: string
 *                   address:
 *                     type: string
 *                   owner:
 *                     type: mongoose.Schema.Types.ObjectId
 *                   description:
 *                     type: string
 *                    area:
 *                     type: string
 *                    location:
 *                     type: string
 *                   _id:
 *                     type: string
 *       401:
 *         description: Access denied
 *       404:
 *         description: realestate not found
 *       500:
 *         description: Internal server error
 */

router.put("/:id", authMiddleware, realestateController.updateItem.bind(realestateController));

/**
 * @swagger
 * /realestate/{id}:
 *   delete:
 *     summary: Delete a realestate by ID
 *     description: Delete a realestate by ID
 *     tags: [realestate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The realestate ID
 *     responses:
 *       200:
 *         description: 
 *       401:
 *         description: Access denied
 *       404:
 *         description: realestate not found
 *       500:
 *         description: Internal server error
 */

router.delete("/:id", authMiddleware, realestateController.deleteItem.bind(realestateController));

export default router;