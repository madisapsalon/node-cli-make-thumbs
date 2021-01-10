#!/usr/bin/env node
import program from 'commander'
import path from 'path';
import inquirer from 'inquirer';
const { thumbnail, directoryExists, readdir, mkdir, rm } = require('./lib')

program
  .version('1.0.0')
  .name('make-thumbs')
  .description('An image resizer to make thumbnails')
  .option('-s --source [folder])', 'Source image directory', 'images')
  .option(
    '-d, --destination [folder]',
    'Directory to be created for thumbnails',
    'thumbnails'
  )
  .parse(process.argv);

const main = async () => {
  try {
    const cwd = process.cwd();

    const { source, destination } = program;
    const srcPath = path.join(cwd, source);
    const destPath = path.join(cwd, destination);

    if (directoryExists(destPath)) {
      await rm(destPath);
    }

    await mkdir(destPath);

    const imagesAll = await readdir(srcPath);
    const imagesCount = imagesAll.length;

    const confirmation = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      message: `You are going to create ${imagesCount} thumbnails from [${imagesAll}]`
    });

    if (confirmation.confirm) {
      for (let image of imagesAll) {
        const src = path.join(srcPath, image);
        const dest = path.join(destPath, image);
        console.log(`Creating thumbnail at: ${dest}`);
        await thumbnail(src, dest);
      }
      console.log('Thumbnails created successfully!');
    } else {
      console.log('You cancelled thumbnails generating');
    }
  } catch (error) {
    console.log(`Error creating thumbnails.
    ${error}`);
  }
}


(async () => await main())();
