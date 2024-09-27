// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const SignupSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: [true, "Full name is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       match: [
//         // /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//         "Please enter a valid email",
//       ],
//     },
//     phoneNumber: {
//       type: String,
//       required: [true, "Phone number is required"],
//       // match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       // minlength: 6,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Hash the password before saving the user
// SignupSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
  
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// const Signup = mongoose.model("Signup", SignupSchema);
// export default Signup;


import mongoose from 'mongoose';

const SignupSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phoneNumber: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const Signup = mongoose.model("Signup", SignupSchema);
export default Signup;
