import { Schema, model, Document ,Types } from 'mongoose';
import { IUser } from './UserModel';

interface IImage extends Document {
  imagePath: string;
  classificationResult: string;
  accuracy: number;
  createdAt: Date;
  user:Types.ObjectId;
}

const ImageSchema = new Schema<IImage>({
  imagePath: { type: String, required: true },
  classificationResult: { type: String, required: true },
  accuracy: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
});


export const ImageModel = model<IImage>('Image', ImageSchema);
