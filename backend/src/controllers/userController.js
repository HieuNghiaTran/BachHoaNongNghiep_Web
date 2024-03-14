
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../models/user");
const userController = {
    addUser: async (req, res) => {
        try {
           

            const user = await Users.find();

            const userFilter = user.filter((c) => {
                return c.email === req.body.email.trim() || c.username === req.body.username.trim()
            });

            if (userFilter.length > 0) {
                res.json({ msg: 'Email hoặc username đã tồn tại' })
            } else {
                var newUser = new Users()
                const salt = await bcrypt.genSalt();
                const pass = await bcrypt.hash(req.body.password, salt);
                newUser.fullname = req.body.name
                newUser.username = req.body.username
                newUser.phone = req.body.phone
                newUser.password = pass
                newUser.id_permission = req.body.id_permission
                newUser.email = req.query.email
                console.log(newUser)

                newUser.save();
                res.json({ msg: "Bạn đã thêm thành công" })

            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }





    },

    getAllUser: async (req, res) => {
        try {
            const users = await Users.find();
            res.status(200).json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);

        }
    },


    updateUser: async (req, res) => {


        try {

            const user = await Users.findById(req.body.id);
            user.fullname = req.body.fullname
            user.username = req.body.username
            user.password = req.body.password
            const savedUser = await Users.save()
            res.status(200).json("thanh cong")
        } catch (err) {
            console.log(err)
            res.status(500)
        }


    },
    // Make sure to replace 'path/to/UsersModel' with the actual path to your Users model.

    getDetailUser: async (req, res) => {
        try {
           
            const username = req.query.username

            const password = req.query.pass
        
            
        console.log(password)
        const query = [{ username: username }]

        const user = await Users.findOne({ $or: query })


        if (user === null) {
            res.json({ msg: "Không Tìm Thấy Users" })
        }
        else {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                var token = jwt.sign(user._id.toJSON(), 'gfdgfd');
                res.json({ msg: "Đăng nhập thành công", user: user, jwt: token })
            } else {
                res.json({ msg: "Sai mật khẩu" })
            }
        }

        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }








    },



};


const AdminUserController = {
    create: async (req, res) => {
        const user = await Users.find();

        const userFilter = user.filter((c) => {
            return c.email === req.query.email.trim() || c.username === req.query.username.trim()
        });

        if (userFilter.length > 0) {
            res.json({ msg: 'Email hoặc username đã tồn tại' })
        } else {
            var newUser = new Users()
            const salt = await bcrypt.genSalt();
            req.query.password = await bcrypt.hash(req.query.password, salt);
            req.query.name = req.query.name.toLowerCase().replace(/^.|\s\S/g, a => { return a.toUpperCase() })
            newUser.fullname = req.query.name
            newUser.username = req.query.username
            newUser.password = req.query.password
            if (req.query.permission) {
                newUser.id_permission = "65f19ba676bbf06b0c946ce6"
            } else newUser.id_permission = req.query.permission
            newUser.email = req.query.email

            newUser.save();
            res.json({ msg: "Bạn đã thêm thành công" })
        }
    },




    login: async (req, res) => {
        const email = req.query.email
        const password = req.query.password
        const body = [{ username: email }, { email: email }]
        const user = await Users.findOne({ $or: body }).populate('id_permission')


        if (user === null) {
            res.json({ msg: "Không Tìm Thấy Users" })
        }
        else {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                var token = jwt.sign(user._id.toJSON(), 'gfdgfd');
                res.json({ msg: "Đăng nhập thành công", user: user, jwt: token })
            } else {
                res.json({ msg: "Sai mật khẩu" })
            }
        }
    },

}

module.exports = { userController, AdminUserController };
