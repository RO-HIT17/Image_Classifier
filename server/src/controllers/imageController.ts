import { Request, Response } from 'express';
import { exec } from 'child_process';
import { ImageModel } from '../models/ImageModel';
import { UserModel } from '../models/UserModel';
import mongoose from 'mongoose';


export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const imagePath = req.file?.path; 
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    exec(`python ../scripts/classify_image.py --image ${imagePath}`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Error processing image');
        return;
      }

      const result = JSON.parse(stdout); 
      if (!user) {
        res.status(404).send('User not found');
        return;
      }
      const image = new ImageModel({
        imagePath,
        classificationResult: result.class,
        accuracy: result.accuracy,
        user: user._id,

      });

      await image.save();
      res.json({ classification: result.class, accuracy: result.accuracy,user: user.email });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
};

export const getResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await ImageModel.find();
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
};

export const getResultsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; 

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid ID format',
      });
    }

    
    const result = await ImageModel.findById(id);

    if (!result) {
      res.status(404).json({
        success: false,
        message: `No result found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching classification result by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching result',
    });
  }
};

export const deleteImages = async (req: Request, res: Response): Promise<void> => {
  try {
    await ImageModel.deleteMany({});
    res.status(200).json({ message: 'All items deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await ImageModel.findByIdAndDelete(req.params.id);
    if (item) {
      res.status(200).json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};