import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new Schema({
    name: {
        type: String,
            required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [20, "Name must be at most 20 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid"]
    },
    password: {
        type: String,
        required:[true, "Password is required"],
        validate: {
            validator: function (value) {
                return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value);
            },
            message: "Password length must be 8 characters and must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        }
        
        //match require (^$) but validator does not 
        //i'm sending the hash password to the database so i'm not using the match here instead i'm using the validator in the register

    },
}
    , { timestamps: true }
);
//thanks to copolot for helping me fixin' the hashing problem
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
UserSchema.pre("save", async function (next) {//arrow function doesn't work good with {this} keyword
    if (this.isModified("password")) {
        this.password = await hashPassword(this.password);
    }
    next();
});
// UserSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new Error("User not found");
//     }
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//         throw new Error("Password is incorrect");
//     }
//     return user;
// }
UserSchema.methods.comparePassword = async function (password) {
    //encryption is one way we don't decode the password we make some kind of instance of the given password
    //and then comparing it's hashed value with the stored one
    return await bcrypt.compare(password,this.password); //order of the parameters is important
}
UserSchema.methods.createAuthToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: "1d" });
    //destruct this_id to _id and then i will name it a key_id = _id
    return token;
}
export default mongoose.model('User', UserSchema);