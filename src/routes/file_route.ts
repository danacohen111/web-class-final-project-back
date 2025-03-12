import express from "express";
import multer from "multer";

const router = express.Router();

const base = process.env.BASE_URL;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
            .filter(Boolean)
            .slice(1)
            .join('.')
        cb(null, Date.now() + "." + ext)
    }
})
const upload = multer({ storage: storage });

/**
 * @swagger
 * /file:
 *   post:
 *     summary: Upload a file
 *     tags: [File]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The URL of the uploaded file
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 */

router.post('/', upload.single("file"), function (req, res) {
    if (!base) {
        return res.status(500).send({ error: 'BASE_URL is not defined' });
    }

    if (!req.file || !req.file.path) {
        return res.status(400).send({ error: 'File is not provided or path is undefined' });
    }

    console.log("router.post(/file: " + base + req.file.path)
    res.status(200).send({ url: base + req.file.path })
});

export default router;