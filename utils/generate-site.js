const fs = require('fs');

// FIRST PROMISE
// same fs.writeFile() function that we have in app. BUT THIS WITH A PROMISE.
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('../utils/index.html', fileContent, err => {
        // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
        if (err) {
          reject(err);
          // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
          return;
        }
  
        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
        resolve({
          ok: true,
          message: 'File created!'
        });
      });
    });
  };
 

// demo HTML code IT EXECUTES THE PROMISE ABOVE.
const sampleHtml = '<h1>TESTING! This will be written to the file!</h1>';

writeFile(sampleHtml)
  .then(successfulResponse => {
    // this will run when we use `resolve()`
    console.log(successfulResponse);
  })
  .catch(errorResponse => {
    // this will run when we use `reject()`
    console.log(errorResponse);
  });





// CREATE A PROMISE FOR FS.COPYFILE()

// const copyFile = fileContent => {
//     return new Promise((resolve, reject) => {
//       fs.copyFile('../utils/index.html', fileContent, err => {
//         // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
//         if (err) {
//           reject(err);
//           // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
//           return;
//         }
  
        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
//         resolve({
//           ok: true,
//           message: 'File copy created!'
//         });
//       });
//     });
//   };
 
  // demo HTML code IT EXECUTES THE PROMISE ABOVE.
// const sampleHtml = '<h1>This will be written to the file!</h1>';

// copyFile(sampleHtml)
//   .then(successfulResponse => {
//     // this will run when we use `resolve()`
//     console.log(successfulResponse);
//   })
//   .catch(errorResponse => {
//     // this will run when we use `reject()`
//     console.log(errorResponse);
//   });
