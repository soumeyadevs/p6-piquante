const express = require ('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceController = require ('../controllers/sauces');
const router = express.Router();

router.get('/', auth, sauceController.getAllSauces);
router.get('/:id', auth, sauceController.getOneSauce);
router.post('/', auth, multer, sauceController.createSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth, sauceController.deleteSauce);
router.post('/:id/like', auth, sauceController.likeOrDislike);

module.exports = router;
