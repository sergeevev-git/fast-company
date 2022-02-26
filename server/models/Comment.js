const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        content: { type: String, required: true },
        // на чьей странице комментарий
        pageId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        // автор комментария
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    // { timestamps: true }
    // создаваться будет в таком формате
    { timestamps: { createdAt: "created_at" } }
);

module.exports = model("Comment", schema);
