const axios = require("axios");
const fs = require("fs");
const originalFile = fs.readFileSync("./file.pdf");

const url = "https://ai-serve.pdftron.com/recog/predict";
const headers = {
  "File-Name": "file.pdf",
  Task: "form",
  "Output-XFDF": false,
  "Output-JSON": true,
};

const config = {
  headers: headers,
  responseType: "blob", // Set the responseType to 'blob' to handle binary data
};

axios
  .post(url, originalFile, config)
  .then((response) => {
    const d = JSON.parse(
      response.data.slice(
        response.data.indexOf("{"),
        response.data.lastIndexOf("]") + 1
      ) + "}"
    );

    fs.writeFileSync("output.json", JSON.stringify(d));

    // return response.data;
  })
  .catch((error) => {
    // Handle errors
    console.error("Axios request error:", error);
  });
