import { Schema, model, models} from "mongoose";


const dishSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    ingredients:{
        type: [String],
        required:true
    }
});

const Dish =models.Dish||  model("Dish", dishSchema);

export default Dish;