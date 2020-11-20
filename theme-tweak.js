var glob = require('glob');
var fs = require('fs');

glob('themes/*.json', function (err, files) {
  // read the folder or folders if you want: example json/**/*.json
  if (err) {
    console.log('cannot read the folder, something goes wrong with glob', err);
  }
  var matters = [];
  files.forEach(function (file) {
    fs.readFile(file, 'utf8', function (err, data) {
      console.log(file);
      // Read each file
      if (err) {
        console.log(
          'cannot read the file, something goes wrong with the file',
          err
        );
      }
      var obj = JSON.parse(data);
      const statusBarBackground = obj.colors['statusBar.background'];
      const statusBarForeground = obj.colors['statusBar.foreground'];
      const activityBarBackground = obj.colors['activityBar.background'];
      const activityBarForeground = obj.colors['activityBar.foreground'];
      const newObj = (obj = {
        ...obj,
        colors: {
          ...obj.colors,
          'statusBar.background': activityBarBackground,
          'statusBar.foreground': activityBarForeground,
          'activityBar.background': statusBarBackground,
          'activityBar.foreground': statusBarForeground,
          'activityBarBadge.background': activityBarBackground,
          'activityBarBadge.foreground': activityBarForeground,
        },
      });
      fs.writeFile(file, JSON.stringify(newObj), { encoding: 'utf8'}, ()=>{})
    });
  });
});
