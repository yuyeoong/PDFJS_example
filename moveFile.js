const fs = require('fs');
const path = require('path');
// const fileList = [
//   "6smC3foaPS", "zyBvjZHa0P", "BVWpNnq5Oj", "3pbmJ+Qy5U", "5Qn9OLNX8i", "CkeEwU2HQH", "aazvqI4yja", "xZwVpikGut", "NW6utd3jZV", "HdiAGTt4kF", "LhlUL+V7qL", "2drnvL7wsv", 
// ]

// fileList.forEach(file => {
//   let currentPath = path.join('/Users/may/Git/brainmap/npm-pdfreader-example/pdfs', file);
//   let destinationPath = path.join('/Users/may/Git/brainmap/MMPI/10061', file);

//   fs.rename(currentPath, destinationPath, (err) => {
//     if(err){
//       console.log(err);
//       throw err;
//     } else {
//       console.log("SUCCESS")
//     }
//   })
// })
const files = fs.readdirSync('/Users/may/Git/brainmap/MMPI/10001');
files.forEach(file => {
  let currentPath = path.join('/Users/may/Git/brainmap/MMPI/10001', file);
  let destinationPath = path.join('/Users/may/Git/brainmap/MMPI/10001', `${file}.pdf`);

  fs.rename(currentPath, destinationPath, (err) => {
    if(err) { 
      console.log(err);
    } else {
      console.log("SUCCESS")
    }
  })
})

