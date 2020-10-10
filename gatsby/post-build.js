const rimraf = require('rimraf');

exports.onPostBuild = () => {
  ['', 'saladcast/', 'video-thing/'].forEach((dir) => {
    rimraf.sync(`public/${dir}[0-9]`);
    rimraf.sync(`public/${dir}[0-9][0-9]`);
    rimraf.sync(`public/${dir}[0-9][0-9][0-9]`);
  });
};
