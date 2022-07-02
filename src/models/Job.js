import mongoose from "mongoose";
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const JobSchema = new Schema({
    position: {
        type: String,
        required: [true, "Position is required"], 
        maxlength: [100, "Position must be at most 20 characters"]
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending", "hired"],
        default: "pending"
    },
    company: {
        type: String,
        required: [true, 'Company is required'],
        maxlength: [50, "Company must be at most 20 characters"]
    },
    createdBy: {
        type: ObjectId,
        ref: "User",
        required: [true, "User is required"]
    }

}
    , { timestamps: true }
);
export default mongoose.model('Job', JobSchema);