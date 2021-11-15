import { ApiImageUploadResponse, RequestWithUserAndFiles } from '../types';
import { Response } from 'express';
import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';
import ImagesService from '../services/imagesService';
import { Image } from '@max-bucket-gallery/api-interfaces';
import { Types } from 'mongoose';

class ImagesController {
  imagesService = new ImagesService();

  public uploadImage = async (req: RequestWithUserAndFiles, res: Response) => {
    try {
      if (!req.files?.image) {
        return res.status(400).json({ message: 'Please, send image file' });
      }

      const uploadImageFormData = new FormData();
      uploadImageFormData.append(
        'image',
        fs.readFileSync(req.files.image.path),
        req.files.image.name
      );
      uploadImageFormData.append(
        'secret_key',
        process.env.NX_MAX_BUCKET_API_SECRET_KEY
      );

      const response = await axios({
        method: 'post',
        url: process.env.NX_MAX_BUCKET_API_URL + '/upload',
        data: uploadImageFormData,
        headers: uploadImageFormData.getHeaders(),
      });
      const uploadedImage: ApiImageUploadResponse = response.data;

      const newImage: Image = {
        _id: new Types.ObjectId(),
        user: req.user._id,
        imageId: uploadedImage.imageId,
        originalImage: uploadedImage.link,
      };

      await this.imagesService.addImage(newImage);

      return res.json({
        message: 'Image uploaded',
        link: uploadedImage.link,
        id: newImage._id,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: 'Failed to upload image' });
    }
  };

  public getUserImages = async (req: RequestWithUserAndFiles, res: Response) => {
    try {
      const {userId} = req.params;

      if (!userId) {
        return res.status(400).json({ message: 'Please, specify user id' });
      }

      const userImages = await this.imagesService.getUserImages(req.user._id);

      return res.json({
        data: userImages,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: 'Failed to get user images' });
    }
  }
}

export default ImagesController;
