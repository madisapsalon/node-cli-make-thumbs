import jimp from 'jimp';
import fs from 'fs'
import { promisify } from 'util';
import path from 'path';
import inquirer from 'inquirer';

const rimraf = require('rimraf');

const thumbnail = async (src: string, dest: string) => {
  const image = await jimp.read(src);
  await image.resize(225, 190, jimp.RESIZE_BICUBIC);
  image.quality(40)
  await image.writeAsync(dest);
}

const directoryExists = (filepath: string) => {
  return fs.existsSync(filepath);
}

const filterImageFiles = (filesList: string[]) => {
  return filesList.filter(file => {
    const fileExtension = path.extname(file);
    return fileExtension === '.jpeg' || fileExtension === '.jpg' || fileExtension === '.png';
  });
}

const confirmThumbnails = async (imageFiles: string[]) => {
  const imagesCount = imageFiles.length;
  const confirmation = await inquirer.prompt({
    type: 'confirm',
    name: 'confirm',
    message: `You are going to create ${imagesCount} thumbnails from [${imageFiles}]`
  });
  return confirmation.confirm;
}

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const rm = promisify(rimraf);

export {
  thumbnail,
  directoryExists,
  filterImageFiles,
  confirmThumbnails,
  readdir,
  mkdir,
  rm
}
