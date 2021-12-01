const express = require("express")

const router = express.Router();

const sendMail = require("../utils/send-mail.js")


const User = require("../models/user.model")

const transporter = require("../config/mail")



router.post("", async (req, res) => {
    
    try {
        const user = await User.create(req.body);

        const userList = await User.find();
        // console.log('userList:', userList)
        userList.forEach( (eachuser) => {

            if(eachuser.role == "admin"){
                const to_admin_message = {
                
            
                    from: "sender@server.com",
                    to: eachuser.email,
                    subject: ` ${req.body.first_name} ${req.body.last_name} has registered with us`,
                    text: `Please welcome ${req.body.first_name} ${req.body.last_name}`,
                    html: `<h1>Please welcome ${req.body.first_name} ${req.body.last_name}</h1>`
                };
                // console.log('message_Admin:', to_admin_message)
                transporter.sendMail(to_admin_message);
            }
            

        } )

        sendMail(req, res);        

        return res.status(200).send(user)
    } catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
});

router.get("", async (req, res) => {
    
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 2;

        const skip = (page - 1) * size;

        const user = await User.find().skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil((await User.find().countDocuments()) / size);
        // console.log('totalPages:', user, totalPages)

        return res.status(200).json({user, totalPages})
    } catch (e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
});

module.exports = router;