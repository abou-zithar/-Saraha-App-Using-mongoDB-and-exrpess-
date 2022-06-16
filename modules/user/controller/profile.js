const messageModel = require("../../../DB/model/message");
const userModel = require("../../../DB/model/User")
const CryptoJS = require("crypto-js");

const displayProfile = async (req, res) => {
    console.log("jiohyoi");
    
        console.log(req.user._id);
        const user = await userModel.findById(req.user._id)
        console.log(user);
        res.json({ message: "Done", user })
   

}

const messagesList = async (req, res) => {
    try {
        const message = await messageModel.find({ reciverId: req.user._id })
        res.json({ message: "Done", message })
    } catch (error) {
        res.json({ message: "catch errr", error })
    }

}


const updateProfilePic = async (req, res) => {
    // console.log({
    //     file: req.file,
    //     fileValidation: req.fileValidation
    // });

    if (req.fileValidation) {
        res.json({ message: "in-valid file format" })
    } else {
        // const imageUrl = `${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.file.filename}`
        const imageUrl = `${req.destinationFile}/${req.file.filename}`
        const user = await userModel.findByIdAndUpdate({ _id: req.user._id }, { profilePic: imageUrl }, { new: true })
        res.json({ message: "Done" })
    }


}



const updateProfileCoverPic = async (req, res) => {
    console.log({
        files: req.files,
        fileValidation: req.fileValidation
    });



    if (req.fileValidation) {
        res.json({ message: "in-valid file format" })
    } else {
        const imageUrls = []
        for (let i = 0; i < req.files.length; i++) {
            imageUrls.push(`${req.destinationFile}/${req.files[i].filename}`)
        }
        const user = await userModel.findOneAndUpdate({ _id: req.user._id }, { coverPic: imageUrls }, { new: true })
        res.json({ message: "Done", user })
    }
}


const updatePhone = async (req, res) => {

    const encryptedPhone = CryptoJS.AES.encrypt(req.body.phone, 'secret key 123').toString();
    const user = await userModel.findOneAndUpdate({ _id: req.user._id }, { phone: encryptedPhone }, { new: true })
    res.json({ message: "Done", user })

}

const updateUser = async (req, res) => {


    const { id } = req.params;
    const { name, phone } = req.body;

    
    const updatedUser = await userModel.findOneAndUpdate({ _id: id }, { name, phone }, { new: true }).select('-password')
    console.log(updatedUser);
    if (updatedUser) {
        res.json({ message: 'Done', updatedUser })
    } else {
        res.json({ message: 'in-valid id' })
    }
}

const allUsers = async (req, res) => {
    const userList = await userModel.find({}).select('-password');
    res.json({ message: "Done", userList })
}
const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    const deletedUser = await userModel.deleteOne({ _id: id }, { new: true }).select("-password")
    res.json({ message: 'Done', deletedUser })
}

module.exports = {
    displayProfile,
    messagesList,
    updateProfilePic,
    updateProfileCoverPic,
    updatePhone,
    updateUser,
    allUsers,
    deleteUser
}