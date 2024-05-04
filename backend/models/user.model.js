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
    picture: {
        type: String,
        required: true,
    },
    reservation: [{
        type: Schema.Types.ObjectId, 
        ref: "Reservation"
    }]
})

const User = models.user || model('user', UserSchema)

export default User;