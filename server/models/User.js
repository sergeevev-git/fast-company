const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        completedMeetings: { type: Number, required: true },
        image: { type: String, required: true },
        rate: { type: Number, required: true },
        sex: { type: String, enum: ["male", "female", "other"] },
        qualities: [{ type: Schema.Types.ObjectId, ref: "Quality" }],
        profession: { type: Schema.Types.ObjectId, ref: "Profession" },
    },
    { timestamps: true }
);

module.exports = model("User", schema);
