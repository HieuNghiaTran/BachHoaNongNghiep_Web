const Users = require("../models/user");
const userController = {
    addUser: async (req, res) => {
        try {
            const username = req.body.username;
            const check = await Users.findOne({ username: username });
    
            if (check) {
                res.status(409).json('Username already exists');
            } else {
                const newUser = await Users.create(req.body); // Await the creation of the new user
                res.status(201).json(newUser);
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
            const { username, pass } = req.query;
    
            const user = await Users.findOne({ $or: [{ username: username }] });
            if (!user) {
                return res.status(404).send("Không Tìm Thấy User");
            } else {
                if (user.password === pass) {
                    return res.json(user);
                } else {
                    return res.status(401).send("Sai Mật Khẩu");
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }
    
   
    
};

module.exports = userController;
