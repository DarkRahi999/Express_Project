const promiseHandler = require("../utils/promiseHandler");

const registerUser = promiseHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User registered successfully"
    });
})

module.exports = {
    registerUser
}