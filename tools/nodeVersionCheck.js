<<<<<<< HEAD
/* eslint-disable */
var exec = require('child_process').exec

exec('node -v', function (err, stdout) {
  if (err) throw err

  if (parseFloat(stdout.slice(1)) < 4) {
    throw new Error('React Slingshot requires node 4.0 or greater.')
  }
})
=======
/* eslint-disable */
var exec = require('child_process').exec;

exec('node -v', function (err, stdout) {
  if (err) throw err;

  if (parseFloat(stdout.slice(1)) < 4) {
    throw new Error('React Slingshot requires node 4.0 or greater.');
  }
});
>>>>>>> 46395453ddd1aec93d2bb13750a92be3e7b76cf8
