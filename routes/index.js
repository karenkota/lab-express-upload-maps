const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/Picture.js');
const uploadCloud = require('../config/cloudinary.js');


/* GET home page */

router.get('/', function(req, res, next) {
  Picture.find((err, pictures) => {
    res.render('index', {pictures})
  })
});

router.get('/map', (req, res, next) => {
  res.render('map');
});

// // incializa o multer e diz rota diretorio deve gravar o arquivo
// const upload = multer({ dest: './public/uploads/' });

// router.post('/upload', upload.single('photo'), (req, res) => {

//   const pic = new Picture({
//     name: req.body.name,
//     path: `/uploads/${req.file.filename}`,
//     originalName: req.file.originalname,
//   });

//   pic.save((err) => {
//     res.redirect('/');
//   });
// });

// config/ cloudinary.js

// PARA SALVAR AS INFOS NO BANCO DE DADOS
router.post('/upload', uploadCloud.single('photo'), (req, res, next) => {
  const { name } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const pic = new Picture({
    name: req.body.pictureName, 
    path: imgPath, 
    originalName: imgName,
  })
  pic.save((err) => {
    res.redirect('/');
  })
});

module.exports = router;
