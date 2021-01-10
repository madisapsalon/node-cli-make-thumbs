import jimp from 'jimp';
const rimraf = require('rimraf');
import fs from 'fs'
import { promisify } from 'util';

const thumbnail = async (src: string, dest: string) => {
  const image = await jimp.read(src);
  await image.resize(225, 190, jimp.RESIZE_BICUBIC);
  image.quality(40)
  await image.writeAsync(dest);
}

const directoryExists = (filepath: string) => {
  return fs.existsSync(filepath);
}

const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
const rm = promisify(rimraf);

module.exports = {
  thumbnail,
  directoryExists,
  readdir,
  mkdir,
  rm,
}
