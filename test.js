const { PDFNet } = require("@pdftron/pdfnet-node");
const licenseKey =
  "demo:1702689599110:7cb348820300000000dbfbabd8402b32f4c8878369f527fd85f17d3aa7";
const inputFile = "./file.pdf";

async function main() {
  // This is where we import data-extraction
  // await PDFNet.addResourceSearchPath("node_modules/@pdftron/pdfnet-node/lib");

  // Extract document structure as a JSON file
  console.log("Extract document structure as a JSON file");

  // Test if the add-on is installed
  if (
    !(await PDFNet.DataExtractionModule.isModuleAvailable(
      PDFNet.DataExtractionModule.DataExtractionEngine.e_Form
    ))
  ) {
    console.log(
      "\nUnable to run Data Extraction: Apryse SDK AIFormFieldExtractor module not available."
    );
    console.log(
      "---------------------------------------------------------------"
    );
    console.log(
      "The Data Extraction suite is an optional add-on, available for download"
    );
    console.log(
      "at https://docs.apryse.com/documentation/core/info/modules/. If you have already"
    );
    console.log(
      "downloaded this module, ensure that the SDK is able to find the required files"
    );
    console.log("using the PDFNet.addResourceSearchPath() function.\n");
  } else {
    try {
      // Extract form fields as a JSON file
      console.log("Extract form fields as a JSON file");

      const outputPath = "./output/";
      let outputFile = outputPath + "formfields-scanned.json";
      await PDFNet.DataExtractionModule.extractData(
        inputFile,
        outputFile,
        PDFNet.DataExtractionModule.DataExtractionEngine.e_Form
      );

      console.log("Result saved in " + outputFile);

      ///////////////////////////////////////////////////////
      // Extract form fields as a JSON string
      console.log("Extract form fields as a JSON string");

      outputFile = outputPath + "formfields.json";
      const json = await PDFNet.DataExtractionModule.extractDataAsString(
        inputPath + "formfields.pdf",
        PDFNet.DataExtractionModule.DataExtractionEngine.e_Form
      );
      fs.writeFileSync(outputFile, json);

      console.log("Result saved in " + outputFile);
    } catch (err) {
      console.log(err);
    }
  }
}

try {
  PDFNet.runWithCleanup(main, licenseKey)
    .catch(function (error) {
      console.log("Error: " + JSON.stringify(error));
    })
    .then(function () {
      return PDFNet.shutdown();
    });
} catch (e) {
  console.log(e);
}

setTimeout(() => {
  console.log("done");
}, 5000);
