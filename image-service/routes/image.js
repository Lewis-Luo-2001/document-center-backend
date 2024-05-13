var express = require('express');
var router = express.Router();

const fs = require('fs');

const authenticator = require('../handler/authenticator');
const imageSaver = require('../handler/imageSaver');
const fileManager = require('../handler/fileManager');

/**
 * @swagger
 * /ids:
 *   get:
 *     summary: Get ids of all images uploaded by the user.
 *     description: Get ids of all images uploaded by the user.
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ids:
 *                   type: array
 *                   items:
 *                     type: string
 *         description: A successful response
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */
router.get('/ids', authenticator.getUserInfo, (req, res) => {
  console.log(req.email);
  const files = fileManager.listFiles(req.email)
  res.send(files);
});

/* GET user's image */
// This route is used to download the image that the user has uploaded.
//
// Request Authentication
// Bearer token: jwt
//
// Request route parameters
// name: The name of the file to download

/**
 * @swagger
 * /:id:
 *   get:
 *     summary: This route is used to download the image that the user has uploaded.
 *     description: Will download the image with the given id.
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *         description: A successful response
 *         
 *       '401':
 *         description: Unauthorized
 * 
 *       '404':
 *         description: User not found
 */
router.get('/:id', authenticator.getUserInfo, (req, res) => {
  const filePath = 'static/' + req.email + '/' + req.params.name;
  if(!fs.existsSync(filePath)) {
    res.sendStatus(404).send('File not found');
  }
  res.download(filePath);
});

/* POST upload image */
// This route is used to upload an image.
//
// Request Authentication
// Bearer token: jwt
//
// Request body:
// file: The image file to upload, must be in PNG or JPEG format

/**
 * @swagger
 * /:
 *   post:
 *     summary: This route is used to upload an image.
 *     description: Will upload the image file.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *         description: A successful response
 * 
 *       '404':
 *         description: User not found
 */
router.post('/', authenticator.getUserInfo, imageSaver.single('file'), (req, res) => {
  const mimetype = fileManager.getMimeType(req.file.path);
  const validMimetype = ['image/png', 'image/jpeg'];
  if(!validMimetype.includes(mimetype)) {
    res.sendStatus(415).send('Unsupported media type');
  }
  res.sendStatus(200);
});

module.exports = router;
