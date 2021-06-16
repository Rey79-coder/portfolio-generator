//ASSIGNS THE ANONYMOUS HTML TEMPLATE FUNCT.
const generatePage = require('./src/page-template.js');
// console.log(inquirer)

const fs = require('fs');

const inquirer = require('inquirer');

// 1ST FUNCTION //
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',


      // USE INQUIRER TO VALIDATE ANSWERS.
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }

    },


    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',

      // USE INQUIRER TO VALIDATE ANSWERS.
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub Username!');
          return false;
        }
      }
    },


    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },

    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          console.log('No info about yourself');
          return false;
        }
      }
    }

  ]);
};

// promptUser().then(answers => console.log(answers));


const promptProject = portfolioData => {

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
=================
Add a New Project
=================
`);


  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',

      // USE INQUIRER TO VALIDATE ANSWERS.
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your project name');
          return false;
        }
      }
    },

    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',

      // USE INQUIRER TO VALIDATE ANSWERS.
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a brief description');
          return false;
        }
      }
    },

    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      // USE INQUIRER TO VALIDATE ANSWERS.
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub link');
          return false;
        }
      }

    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false

    }
  ]) // THIS IS THE END OF THE ARRAY.

    // HERE WE ARE ALLOWING USERS TO ADD MORE PROJECTS.
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

// REVIEW
// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     return generatePage(portfolioData);
//   })
//   .then(pageHTML => {
//     return writeFile(pageHTML);
//   })
//   .then(writeFileResponse => {
//     console.log(writeFileResponse);
//     return copyFile();
//   })
//   .then(copyFileResponse => {
//     console.log(copyFileResponse);
//   })
//   .catch(err => {
//     console.log(err);
//   });

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);


   
//  THIS FUNCTION WILL CREATE A COPY OF THE HTML AND STYLE.
 fs.writeFile('./src/dist/index.html', pageHTML, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Page created! Check out index.html in this directory to see it!');

  fs.copyFile('./src/style.css', './src/dist/style.css', err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Style sheet copied successfully!');
  });
});



// THIS FUNCTION CHANGES THE ROOT INDEX
  //   fs.writeFile('./index.html', pageHTML, err => {
  //     if (err) throw new Error(err);

  //     console.log('Page created! Check out index.html in this directory to see it!');
  //   });
  // });



// const profileDataArgs = process.argv.slice(2);

// console.log(profileDataArgs);

// const [name, github] = profileDataArgs;

// console.log(name, github);

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });


// const generatePage = () => 'Name: Jane, Github: janehub';
// console.log(generatePage());


// const profileDataArgs = process.argv.slice(2);

// const printProfileData = profileDataArr => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

  // Is the same as this...
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);


// const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;
// console.log(generatePage('Jane', 'janehub'));

// const generatePage = () => 'Name: Jane, Github: janehub';

// const generatePage = (userName, githubName) => {
//     return `
//       Name: ${userName}
//       GitHub: ${githubName}
//     `;
//   };

// const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;

// console.log(generatePage('Jane', 'janehub'));

// var message = 'Hello Node!';

// var sum = 5 + 3;

// console.log(message);
// console.log(sum);


// var commandLineArgs = process.argv;
// console.log(commandLineArgs);

// var profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);

// The const keyword is a new feature in JavaScript that allows us to create variables that can't be reassigned a value.
// const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);


// EX; ERROR CONST CANNOT BE OVERWRITTEN
// const message = 'Hello Node!';
// message = 'Goodbye Node!';

// const sum = 5 + 3;
// sum += 1;



// const animalArray = ['dog', 'cat', 'pig'];

// animalArray.push('cow');

// const personObj = {
//   name: 'Lerantino',
//   age: 99
// };


// personObj.age = 100;
// personObj.occupation = 'Developer';

///////////////    9.1.6 LESSON   //////////////

// Using function expression syntax NORMAL JS SYNTAX
// const addNums = function(numOne, numTwo) {
//     return numOne + numTwo;
//   };

  // Using NEW ARROW FUNCTION syntax with 2 parameters =>
//   const addNums = (numOne, numTwo) => {
//     return numOne + numTwo;
//   };


// NEW ARROW FUNCTION with one parameter.
//   const printProfileData = profileDataArr => {
//     console.log(profileDataArr);
//   };


// const addNums = (numOne, numTwo) => numOne + numTwo;

// const sum = addNums(5, 3); //// sum would be 8

//   const addNums = (numOne, numTwo) => {
//     console.log(numOne, numTwo);
//     return numOne + numTwo;
//   };

// Notice the lack of parentheses around the `profileDataArr` parameter?
// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i++) {
//       console.log(profileDataArr[i]);
//     }
//   };

//// LET CAN REASSIGN THE VALUE OF THE VAR
//   let message = 'Hello Node!';
// message = 'Hello ES6!';

// let sum = 5 + 3;
// sum += 1;

// const message = 'Hello Node!';

// if (true === true) {
//   const message = 'Hello ES6!';
//   let sum = 5;
//   sum += 10;
//   console.log(message);
//   console.log(sum);
// }

// console.log(message);
// console.log(sum);


// var is function-scoped, so redeclaring it in a block will cause its value outside the block to change as well:

// var one = 'one: declared outside the block';

// if (true === true) {
//   var one = 'one: declared inside the block'; // notice: we redeclare 'one' here
//   console.log(one); // prints 'one: declared inside the block'
// }

// console.log(one); // also prints 'one: declared inside the block', because the variable was redeclared in the 'if' block. The outer 'var' variable was therefore destroyed and replaced by inner var variable.

// 'let' is block-scoped, so redeclaring a 'let' variable inside of a block creates a different 'let' variable with the same name whose scope is inside the block:

// let two = 'two: declared outside the block';

// if (true === true) {
//   let two = 'two: declared inside the block';
//   console.log(two); // prints 'two: declared inside the block'
// }

// console.log(two); // prints 'two: declared outside the block', because two declared inside the block is a separate variable. The 'let' variables are unrelated and therefore are unaffected by each other.


// var is function-scoped, so changing its value in a block causes its value in the outer environment to change as well:

// var three = 'three: declared outside the block';

// if (true === true) {
//   three = 'three: changed inside the block'; // notice: we don't redeclare
//   console.log(three); // prints 'three: changed inside the block'
// }

// console.log(three); // also prints 'three: changed inside the block', because the variable has function scope. This means that the value change in the block is reflected throughout the function, i.e., outside the block.

// let is block-scoped, so changing its value in a block does change its value outside the block _if_ the variable is not redeclared in the block:

// let four = 'four: outside the block';

// if (true === true) {
//   four = 'four: inside the block'; // notice: we don't redeclare the variable
//   console.log(four); // prints 'four: inside the block'
// }

// console.log(four); // prints 'four: inside the block', because we didn't redeclare the variable inside the block. That meant we referenced the variable outside the block, and we therefore changed it.



// const printProfileData = profileDataArr => {
//     // This...
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//       console.log(profileDataArr[i]);
//     }

//     console.log('================');

//     // NEWER TYPE OF METHOD for iteration: Is the same as this... 
//     profileDataArr.forEach(profileItem => console.log(profileItem))
  })