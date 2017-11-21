import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import mkdirp from 'mkdirp';
import jimp from 'jimp';

export const uploadImages = (req, res) => {
  try {
    const retHash = [];
    const { images = [] } = req.body;

    for (let i = 0; i < images.length; i += 1) {
      const data = images[i].imageURL.replace(/^data:image\/\w+;base64,/, '').replace(/\s/g, '+');
      const pathMd5 = md5(data);
      const pathFolder = path.resolve(__dirname, '../uploads', pathMd5.slice(0, 2), pathMd5.slice(2, 4));
      const buf = Buffer.from(data, 'base64');

      mkdirp.sync(pathFolder, (err) => { throw err; });

      jimp.read(buf, (err, image) => {
        if (err) throw err;
        image.quality(60)
          .write(`${pathFolder}/${pathMd5.slice(4)}-ori.jpg`, (error) => { if (error) throw error; });
      });

      jimp.read(buf, (err, image) => {
        if (err) throw err;
        image.resize(120, 120)
          .quality(60)
          .write(`${pathFolder}/${pathMd5.slice(4)}-sml.jpg`, (error) => { if (error) throw error; });
      });

      retHash.push(pathMd5);
    }

    return res.json({
      images: retHash,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getImages = (req, res) => {
  try {
    const retImages = [];
    const { images = [] } = req.body;

    for (let i = 0; i < images.length; i += 1) {
      const pathMd5 = images[i];
      const pathFolder = path.resolve(__dirname, '../uploads', pathMd5.slice(0, 2), pathMd5.slice(2, 4));
      const data = fs.readFileSync(`${pathFolder}/${pathMd5.slice(4)}-ori.jpg`, 'utf8');
      retImages.push(data);
    }

    return res.json({
      images: retImages,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
