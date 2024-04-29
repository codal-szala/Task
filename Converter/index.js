const express = require("express");
const fs = require("fs");
const pdf = require("html-pdf");
const path = require("path");

const app = express();


app.get("/convert-to-pdf", (req, res) => {
    const htmlFilename = "demo.html";
    const htmlFilePath = path.join(__dirname, htmlFilename);//here we define the html file path

    const htmlContent = fs.readFileSync(htmlFilePath, "utf8"); // 
   

    const pdfFilePath = path.join(__dirname, "pdfs", "output.pdf");
    console.log("PDF",pdfFilePath);

    pdf.create(htmlContent).toFile(pdfFilePath, (err, result) => {
        if (err) {
            return res.status(500).send("Error generating PDF");
        }

        // Set headers for file download
        res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
        res.setHeader("Content-Type", "application/pdf");

        // Sending the PDF file as response
        const stream = fs.createReadStream(pdfFilePath);
        stream.pipe(res);

        // Delete the PDF file after sending
        stream.on("end", () => {
            fs.unlinkSync(pdfFilePath);
        });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});