import { RequestWithUserAndFiles } from '../types';
import { Response } from 'express';
import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';

export const uploadImage = async (
  req: RequestWithUserAndFiles,
  res: Response
) => {
  try {
    console.log('Upload image', req.user, req.files);

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
      headers: uploadImageFormData.getHeaders()
    });
    const data = response.data;

    console.log('Image upload result', { data });

    return res.json({ message: 'Image uploaded' });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: 'Failed to upload image' });
  }
};
