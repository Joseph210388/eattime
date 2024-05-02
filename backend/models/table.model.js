import {Schema, model, models } from "mongoose";

const tableSchema = new Schema({
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    available: {
        type: Boolean,
        default: true
    }
});

const Table = models.Table || model("Table", tableSchema);

export default Table;