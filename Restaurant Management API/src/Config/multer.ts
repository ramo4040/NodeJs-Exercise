import multer from "multer";

// Set up storage for uploaded files
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname
    req.body.image = name
    cb(null, name);
  },
});

// Create the multer instance
const upload = multer({ 
  storage: diskStorage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); 
    } else {
      cb(null,false);
      req.fileTypeError = 'Invalid file type. Only JPEG and PNG files are allowed.'; 
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 } 
});

export default upload;
