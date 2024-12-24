import express from 'express';
import multer from 'multer';

const router = express.Router();

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Wrong file type');
            error.code = 'LIMIT_FILE_TYPES';
            return cb(error, false);
        }
        
        cb(null, true);
    },
    limits: { fileSize: 10 * 1024 * 1024}
})

router.post('/', upload.single('image'), (req, res) => {
    
    if(!req.file){
        return res.status(400).send({error: 'No file uploaded'});
    }

    console.log('Uploaded file:', req.file);

    res.status(200).send({
        message: 'Image uploaded successfully!',
        fileInfo: req.file,
    });
});

export default router;