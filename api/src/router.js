const { Router } = require('express');
const multer = require('multer');
const { multiply } = require('ramda');

const router = Router();
const storage = multer.diskStorage({
  destination: 'api/uploads/',
  filename,
});

const upload = multer({
  fileFilter,
  storage,
});

function fileFilter(request, file, callback) {
  if (file.mimetype !== 'image/png') {
    request.fileValidationError = 'Wrong file type';
    callback(null, false, new Error('Wrong file type'));
  } else {
    callback(null, true);
  }
}

function filename(request, file, callback) {
  callback(null, file.originalname);
}

router.post('/upload', upload.single('photo'), (request, response) => {
  if (request.fileValidationError) {
    return response.status(400).json({ error: request.fileValidationError });
  }
  return response.status(201).json({ success: true });
});

module.exports = router;
