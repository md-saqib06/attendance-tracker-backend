import mongoose, { Schema, Document } from 'mongoose';

interface IUserDetails extends Document {
    mail: string;
    password: string;
}

const UserDetailsSchema = new Schema({
    mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export const UserDetails = mongoose.model<IUserDetails>('Users', UserDetailsSchema);
