import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import mkdirp from 'mkdirp';
import jimp from 'jimp';

export const uploadImages = (req, res) => {
  const retHash = [];
  const { images = [] } = req.body;

  for (let i = 0; i < images.length; i += 1) {
    const data = images[i].img.replace(/^data:image\/\w+;base64,/, '').replace(/\s/g, '+');
    const pathMd5 = md5(images[i].img);
    const pathFolder = path.resolve('../uploads', pathMd5.slice(0, 2), pathMd5.slice(2, 4));
    const buf = Buffer.from(data, 'base64');

    mkdirp.sync(pathFolder, (err) => {
      console.error('Make Directory ERROR (image.upload_images) : %s', err.message); // eslint-disable-line no-console
    });

    jimp.read(buf, (err, image) => {
      image.quality(60)
        .write(`${pathFolder}/${pathMd5.slice(4)}-ori.jpg`, (error) => {
          console.error('Write Image ERROR (image.upload_images) : %s (ori)', error.message); // eslint-disable-line no-console
        });
    });

    jimp.read(buf, (err, image) => {
      image.resize(120, 120)
        .quality(60)
        .write(`${pathFolder}/${pathMd5.slice(4)}-sml.jpg`, (error) => {
          console.error('Write Image ERROR (image.upload_images) : %s (sml)', error.message); // eslint-disable-line no-console
        });
    });

    retHash.push(pathMd5);
  }

  return res.json({
    message: '上传图片成功',
    images: retHash,
  });
};

export const getImages = (req, res) => {
  const retImages = [];
  const { images = [] } = req.body;

  for (let i = 0; i < images.length; i += 1) {
    const pathMd5 = images[i];
    const pathFolder = path.resolve('../uploads', pathMd5.slice(0, 2), pathMd5.slice(2, 4));
    let data;
    try {
      data = fs.readFileSync(`${pathFolder}/${pathMd5.slice(4)}-ori.jpg`, 'utf8');
    } catch (err) {
      console.error('Read Image ERROR (image.getImages) : %s/%s-ori.jpg', pathFolder, pathMd5.slice(4)); // eslint-disable-line no-console
    }
    retImages.push(data);
  }

  return res.json({
    message: '获取图片成功',
    images: retImages,
  });
};
