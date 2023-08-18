const fs = require('fs');

const deleteFile = (path) => {
  fs.unlinkSync(path, (err) => {
    if (err) throw err;
  });
};

module.exports = deleteFile;
