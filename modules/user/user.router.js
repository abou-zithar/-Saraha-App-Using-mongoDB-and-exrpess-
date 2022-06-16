const { auth } = require('../../midlwear/auth')
const { displayProfile, messagesList, updateProfilePic, updateProfileCoverPic, updatePhone, updateUser, allUsers, deleteUser } = require('./controller/profile')
const endPoint = require('./user.endPoint')
const multerData = require('../../services/multerRev')
const router = require('express').Router()



router.get('/userPr', auth(endPoint.profile), displayProfile)

router.get("/user/messages", auth(endPoint.profileMessages), messagesList)
router.patch("/user/profile/pic", multerData.myMulter('users/profilePic', multerData.validateFileMthod.image).single('image'), auth(endPoint.profileMessages), updateProfilePic)
router.patch("/user/profile/coverPic",
    multerData.myMulter('users/coverPic', multerData.validateFileMthod.image).array('image', 5),
    auth(endPoint.profileMessages), updateProfileCoverPic)


router.patch("/user/phone", auth(endPoint.profileMessages) , updatePhone)

router.patch('updata/:id',updateUser)
router.get('/getusers',allUsers)
router.delete('/delete/:id',deleteUser)







module.exports = router