const imgPath = (img) => {
  const imgURL = `${img.path.replace('\\', '/')}`;
  return imgURL;
};

module.exports = imgPath;
