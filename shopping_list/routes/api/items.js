const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Item')

const item = require('../../controllers/Item')

//@route GET api/items
//@des Get All Items
//@access Public
router.get('/',item.findAll)

//@route POST api/items
//@des Create a item
//@access Public

router.post('/', item.create)

//@route DELETE api/items/:id
//@des Delete a item
//@access Public

router.delete('/:id', item.delete)

module.exports = router;
