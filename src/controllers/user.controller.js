const promiseHandler = require("../utils/promiseHandler");
const ApiError = require("../utils/apiError");
const User = require("../models/user.models");
const uploadFile = require("../utils/cloudinary");
const ApiResponse = require("../utils/apiResponse");

const registerUser = promiseHandler(async (req, res) => {
  //W-----------{ Destructuring user data }--------------
  const { userName, email, fullName, password } = req.body;

  //W-----------{ Validate the required fields }--------------
  if (
    !userName?.trim() ||
    !email?.trim() ||
    !fullName?.trim() ||
    !password?.trim()
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //W-----------{ user already exists }--------------
  if (await User.findOne({ email })) {
    throw new ApiError(400, "Email already exists");
  }

  if (await User.findOne({ userName })) {
    throw new ApiError(400, "Username already exists");
  }

  //W-----------{ collecting uploaded files }--------------
  //const avatarPath = req.files?.avatar?.[0]?.path;
  //const CoverImgPath = req.files?.coverImg?.[0]?.path;

  //if (!avatarPath) {
  // throw new ApiError(400, "Avatar is required");
  //}

  //W-----------{ check file is uploaded or not }--------------
  //const avatar = await uploadFile(avatarPath);
  //const coverImg = await uploadFile(CoverImgPath);

  //if (!avatar) {
   // throw new ApiError(500, "Failed to upload files");
  //}

  //W-----------{ Create a new user }--------------
  const newUser = await User.create({
    userName,
    email,
    fullName,
   // avatar: avatar.url,
    //coverImg: coverImg?.url || "",
    password,
  });

  const createUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  //W-----------{ new user validation }--------------
  if (!createUser) {
    throw new ApiError(500, "Failed to create user");
  }

  res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", createUser));
});

module.exports = {
  registerUser,
};
