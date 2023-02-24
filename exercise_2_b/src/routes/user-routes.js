const router = require('express').Router()
const {fetchUserByID, saveUsers, updateUsers, deleteUsers, fetchAll} = require('../controller/user-controller')

router.get('/:firstName/details', fetchAll)
router.get('/:firstName/details/:id', fetchUserByID)
router.post('/:firstName/details', saveUsers)
// router.patch('/:id', updateUsers)
router.delete('/:firstName/details/:id', deleteUsers)

module.exports = router