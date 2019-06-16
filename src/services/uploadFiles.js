const multer = require('multer'),
    path = require('path'),
    uuid = require('uuid/v4');

const fileSize = 1024 * 1024 * 4,
    UploadFile = {};

// Filter of accepted files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else if(file.mimetype === 'application/pdf'){
        cb(null, true)
    } else {
        req.fileValidationError = 'The image does not have a valid extension';
        return cb(null, false, new Error())
    }
}

// Perfil Image
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILE_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, uuid() + path.extname(file.originalname))
    }
})

UploadFile.userPhoto = (req, res, next) => {
    const uploadUserPhoto = multer({
        storage: storageUser,
        dest: process.env.FILE_PATH,
        limits: {
            fileSize: fileSize
        },
        fileFilter: fileFilter
    }).single('userPhoto')

    uploadUserPhoto(req, res, (error) => {
        if (error) return res.status(422).json({ error: 'Invalid file' })
        next()
    })
}

// Proyect Images
const storageProyect = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILE_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

UploadFile.proyectPhotos = (req, res, next) => {
    const uploadProyectPhotos = multer({
        storage: storageProyect,
        dest: process.env.FILE_PATH,
        limits: {
            fileSize: fileSize
        },
        fileFilter: fileFilter
    }).array('proyectImages', 15);

    uploadProyectPhotos(req, res, (error) => {
        if (error) return res.status(422).json({ error: 'Invalid file' })
        next()
    })
}

module.exports = UploadFile;