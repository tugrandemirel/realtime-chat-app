import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

// USER REGISTER
export const register = async (req, res, next) => {
   try{
       const {username, email, password} = req.body

       const usernameCheck = await User.findOne({username})
       if (usernameCheck)
           return res.json({
               msg: 'Username already used',
               status: false
           })
       const emailCheck = await User.findOne({email})
       if (emailCheck)
           return res.json({
               msg: 'Email already used',
               status: false
           })
       const hashedPassword = await bcrypt.hash(password, 10)
       const user = await User.create({
           username,
           email,
           password:hashedPassword
       })
       delete user.password;
       return  res.json({
           user,
           status: true
       })
   }catch (e) {
       next(e)
   }
}
// USER LOGIN
export const login = async (req, res, next) => {
   try{
       const {username, password} = req.body

       const user = await User.findOne({username})
       if (!user)
           return res.json({
               msg: 'Incorrect username or password',
               status: false
           })
       const isPasswordValid = await bcrypt.compare(password, user.password)
       if(!isPasswordValid)
           return res.json({
               msg: 'Incorrect username or password',
               status: false
           })
       delete user.password;
       return  res.json({
           user,
           status: true
       })
   }catch (e) {
       next(e)
   }
}
export const setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (ex) {
        next(ex);
    }
}
export const getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find({_id: {$ne: req.params._id}}).select([
            '_id',
            'username',
            'email',
            'avatarImage'
        ])
        return res.json(users)
    }catch (e) {
        next(e)
    }
}