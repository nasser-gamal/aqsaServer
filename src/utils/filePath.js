const imgPath = (img) => {
  const imgURL = `${img.path.replace('\\', '/')}`;
  return imgURL;
};

export default imgPath;
