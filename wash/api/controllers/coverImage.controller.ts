import { Request, Response } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
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
        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Error sending image URL.' });
    }
};

export { upload, uploadCoverImage };
