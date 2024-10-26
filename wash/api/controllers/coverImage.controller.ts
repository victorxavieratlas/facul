import { Request, Response } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { v7 as uuidv7 } from 'uuid';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        // Gera um nome único para o arquivo
        cb(null, `${uuidv7()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Função para fazer upload local
const uploadCoverImage = async (req: Request, res: Response) => {
    const file = req.file; // Agora, req.file está corretamente tipado

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // URL da imagem salva localmente
    const imageFileName = file.filename;
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${imageFileName}`;

    try {
        res.json({ imageUrl, imageFileName });
    } catch (error) {
        res.status(500).json({ error: 'Error sending image URL.' });
    }
};

const deleteCoverImage = async (req: Request, res: Response) => {
    const imageFileName = req.body.imageFileName;

    if (!imageFileName) {
        return res.status(400).json({ error: 'No image file name provided.' });
    }

    // Validate the imageFileName to prevent directory traversal attacks
    if (imageFileName.includes('/') || imageFileName.includes('\\')) {
        return res.status(400).json({ error: 'Invalid image file name.' });
    }

    const imagePath = path.join(__dirname, '..', 'uploads', imageFileName);

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting image:', err);
            return res.status(500).json({ error: 'Error deleting image.' });
        }

        res.status(200).json({ message: 'Image deleted successfully.' });
    });
};

export { upload, uploadCoverImage, deleteCoverImage };
