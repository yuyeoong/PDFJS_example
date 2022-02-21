const fs = require('fs');
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
// const files = fs.readdirSync('/Users/may/Git/brainmap/MMPI/MMPI_ERR_TYPE');
// const testFiles = files.slice(0,100);
const testFiles = ['YOUTH_N1WZdtOgQG']
console.log(testFiles);
testFiles.forEach(file => {
  const pdfPath = `/Users/may/Git/brainmap/MMPI/MMPI_ERR_TYPE/check/${file}`;
  
  // Will be using promises to load document, pages and misc data instead of
  // callback.
  const loadingTask = pdfjsLib.getDocument(pdfPath);

  loadingTask.promise
    .then(function (doc) {
      const numPages = doc.numPages;

      let lastPromise; // will be used to chain promises
      lastPromise = doc.getMetadata().then(function (data) {
        // console.log("## Metadata Info");
        // console.log(JSON.stringify(data.info, null, 2));
        // console.log();
        
        if (data.metadata) {
          // console.log("## Metadata");
          // console.log(JSON.stringify(data.metadata.getAll(), null, 2));
          // console.log();
        }
      });

      const loadPage = function (pageNum) {
        return doc.getPage(pageNum).then(function (page) {
          // console.log("# Page " + pageNum);
          const viewport = page.getViewport({ scale: 1.0 });
          // console.log("Size: " + viewport.width + "x" + viewport.height);
          // console.log();
          return page
            .getTextContent()
            .then(function (content) {
              // Content contains lots of information about the text layout and
              // styles, but we need only strings at the moment
              // console.log("## Text Content");
              // const strings = content.items.filter(function (item) {
              //   return item.transform[4] > 100 && item.transform[5] == 308.5 && item.str !== ' ';
              // }).map(item => item.str);
              // 4: X position, 5: Y position
              const strings = content.items.filter(item => {
                  return item.transform[4] > 110 && item.transform[5] == 304.75 && item.str !== ' ';
              }).map(item => item.str)
              
              // console.log(strings.join(" "));
              
              console.log(strings.join("|") == '' ? `@@@ ${file}.pdf @@@` : `${file}.pdf ### ${strings.join("|")}`);
              
              // Release page resources.
              page.cleanup();
            })
            .then(function () {
              console.log();
            });
        });
      };
      // Loading of the first page will wait on metadata and subsequent loadings
      // will wait on the previous pages.
      
      lastPromise = lastPromise.then(loadPage.bind(null, 1));
      
      return lastPromise;
    })
    .then(
      function () {
        //console.log("#### End ####");
      },
      function (err) {
        console.error(`Error: ${file}.pdf : ` + err);
      }
    );
})



