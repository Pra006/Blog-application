import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

const url = 'https://blog-application-1-boor.onrender.com';
let GridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    GridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
})

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filename = Date.now() + '-' + req.file.originalname;
        const uploadStream = GridfsBucket.openUploadStream(filename, {
            contentType: req.file.mimetype,
        });

        uploadStream.end(req.file.buffer);

        uploadStream.on('finish', () => {
            const imageUrl = `${url}/file/${filename}`;
            return res.status(200).json({ imageUrl });
        });

        uploadStream.on('error', (error) => {
            console.error('Upload Error:', error);
            return res.status(500).json({ message: 'Upload failed' });
        });

    } catch (error) {
        console.error('Upload Error:', error);
        return res.status(500).json({ message: 'Upload failed' });
    }
};

export const getImage = async (req, res) => {
try {
    const files = await GridfsBucket.find({ filename: req.params.filename }).toArray();
    if (files.length === 0) {
        return res.status(404).json({ message: 'File not found' });
    }
    const file = files[0];
    const readStream = GridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
} catch (error) {
    return res.status(500).json({
        message: error.message
    })
}

}