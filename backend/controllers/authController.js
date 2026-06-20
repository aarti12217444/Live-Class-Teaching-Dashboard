const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:
        process.env.EMAIL_USER,
      pass:
        process.env.EMAIL_PASS,
    },
  });

const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        fullName,
        email,
        password:
          hashedPassword,
        role,
      });

    res.status(201).json({
      message:
        "Registration Successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      role: user.role,
      fullName: user.fullName,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const forgotPassword =
  async (req, res) => {
    try {

      const { email } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      const otp =
        otpGenerator.generate(
          6,
          {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          }
        );

      user.otp = otp;

      user.otpExpires =
        Date.now() +
        10 * 60 * 1000;

      await user.save();

      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,
        to: email,
        subject:
          "Vedic Classes OTP",
        text: `Your OTP is ${otp}`,
      });

      res.json({
        message:
          "OTP Sent Successfully",
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  // const forgotPassword =
  // async (req, res) => {
  //   try {

  //     const { email } =
  //       req.body;

  //     const user =
  //       await User.findOne({
  //         email,
  //       });

  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({
  //           message:
  //             "User not found",
  //         });
  //     }

  //     const otp =
  //       otpGenerator.generate(
  //         6,
  //         {
  //           upperCaseAlphabets: false,
  //           lowerCaseAlphabets: false,
  //           specialChars: false,
  //         }
  //       );

  //     user.otp = otp;

  //     user.otpExpires =
  //       Date.now() +
  //       10 * 60 * 1000;

  //     await user.save();

  //     await transporter.sendMail({
  //       from:
  //         process.env.EMAIL_USER,
  //       to: email,
  //       subject:
  //         "Vedic Classes OTP",
  //       text: `Your OTP is ${otp}`,
  //     });

  //     res.json({
  //       message:
  //         "OTP Sent Successfully",
  //     });

  //   } catch (error) {
  //     res.status(500).json({
  //       message:
  //         error.message,
  //     });
  //   }
  // };

  const verifyOtp =
  async (req, res) => {
    try {

      const { email, otp } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      if (user.otp !== otp) {
        return res.status(400).json({
          message:
            "Invalid OTP",
        });
      }

      if (
        user.otpExpires <
        Date.now()
      ) {
        return res.status(400).json({
          message:
            "OTP Expired",
        });
      }

      res.json({
        message:
          "OTP Verified",
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  const resetPassword =
  async (req, res) => {
    try {

      const {
        email,
        newPassword,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      user.otp = null;
      user.otpExpires = null;

      await user.save();

      res.json({
        message:
          "Password Updated Successfully",
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyOtp,
};