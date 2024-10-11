import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

});


export const UserModel = model<IUser>('User', UserSchema);
