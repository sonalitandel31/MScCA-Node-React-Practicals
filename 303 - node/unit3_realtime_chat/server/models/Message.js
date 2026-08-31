const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        room: {
            type: String,
            default: "General",
        },
        type: {
            type: String,
            enum: ["text", "location", "system"],
            default: "text",
        },
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", messageSchema);