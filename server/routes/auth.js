const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) =>{
    try { 
        console.log("Attempting signup11", req.body);
        const hashPassword = await bcrypt.hash( req.body.password, 10);
        const user = new User({
            userName: req.body.userName,
            password: hashPassword
        });
        await user.save();
        res.json({message : " logup successful"});
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
});
router.post("/login", async (req, res) => {
    console.log("Attempting login", req.body);
    const user = await User.findOne({ userName: req.body.userName});
    if ( !user ) return res.status(400).json({error: "User not found"});

    const valid = await bcrypt.compare(req.body.password, user.password);
    if ( !valid ) return res.status(400).json({error: "Wrong password"});

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ user });
})

module.exports = router;