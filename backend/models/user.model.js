import { Schema, model, models } from "mongoose";

const UserSchema = new Schema ({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    cartId: [{
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }],
    reservation: [{
        type: Schema.Types.ObjectId, 
        ref: "Reservation"
    }]
})

const User = models.User || model('User', UserSchema)

export default User;