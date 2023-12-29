const asyncHandler = require('express-async-handler')
const UserModel = require('../models/UserModel');
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.getUsers = asyncHandler(async (req, res) => {

    const users = await UserModel.find({})

    if (users) {
        return res.json(users)
    } else {
        res.status(404).json({ message: 'User not found!!' })
    }
}
)


exports.getUserByID = asyncHandler(async (req, res) => {

    const user = await UserModel.findById(req.params.id).select('-password');

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: 'User not found!!' })
    }

})


exports.getUserProfile = asyncHandler(async (req, res) => {

    const user = await UserModel.findById(req?.user?._id)

    if (user) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user?.avatar,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),

        })
    } else {
        res.status(404).json({ message: 'User not found!!' })
    }

})

exports.updateUserProfile = asyncHandler(async (req, res) => {

    const user = await UserModel.findById(req?.user?._id)


    if (user) {
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.email = req.body.email || user.email
        user.avatar = req?.file?.path || user?.avatar
        user.isAdmin = req.body.isAdmin || user.isAdmin

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            avatar: updatedUser?.avatar,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404).json({ message: 'User not found!!' })
    }

})


exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(500).send({ message: 'Email is required' });

    }

    try {
        const user = await UserModel.findOne({ email }).exec();

        var passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid Password!' });
        }

        else if (user && passwordIsValid) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user?.avatar,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.log('Error in authUser:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});



exports.registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, isAdmin } = req.body;
    const avatar = req?.file?.path;

    try {
        const existUser = await UserModel.findOne({ email })

        if (existUser) {
            res.status(400)
                .json({ message: 'User already exist' });
        }

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            avatar,
            password,
            isAdmin
        })

        if (user) {

            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user?.avatar,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });

        } else {

            res.status(400)
                .json({ message: 'Invalid user data' });
        }


    } catch (err) {
        console.log('Error in registerUser:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});


exports.deleteUser = asyncHandler(async (req, res) => {

    const user = req.user._id;

    try {
        if (!user) {
            res.status(404).json({ message: "User not found!!" })
        } else {

            await UserModel.findByIdAndDelete(user)
        }


    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }



})