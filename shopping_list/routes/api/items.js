const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
//Item Model
const Item = require('../../models/Item')

const item = require('../../controllers/Item')

//@route GET api/items
//@des Get All Items
//@access Public
router.get('/',item.findAll)

//@route POST api/items
//@des Create a item
//@access Private

router.post('/',auth, item.create)

//@route DELETE api/items/:id
//@des Delete a item
//@access Private

router.delete('/:id',auth, item.delete)

module.exports = router;
