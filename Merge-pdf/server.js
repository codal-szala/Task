const express = require("express");
const path = require("path");
const app = express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {mergepdf} = require("./testpdf");

app.use('/static',express.static('public'))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"template/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
    try {
        console.log(req.files);
        
       
        if (!req.files || req.files.length < 2) {
            return res.status(400).send('Please upload at least two PDF files.');
        }

        await mergepdf(
            path.join(__dirname, req.files[0].path),
            path.join(__dirname, req.files[1].path)
        );

       
        res.redirect("http://localhost:3000/static/merged.pdf");
    } catch (error) {
        console.error('Error occurred while merging PDFs:', error);
        res.status(500).send('Error while merging');
    }
});

app.listen(3000,()=>{
    console.log("Listen Successfully");
})