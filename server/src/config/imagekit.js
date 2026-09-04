const ImageKit = require("imagekit");

let instance = null;

function getImagekit() {
  if (instance) return instance;

  const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

  if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
    const err = new Error(
      "ImageKit belum dikonfigurasi. Isi IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, dan IMAGEKIT_URL_ENDPOINT di .env (ambil dari dashboard ImageKit.io > Developer Options)."
    );
    err.statusCode = 500;
    throw err;
  }

  instance = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  });

  return instance;
}

module.exports = getImagekit;