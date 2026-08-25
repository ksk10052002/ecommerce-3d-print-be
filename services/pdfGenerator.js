const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


const generatePDF = (data) => {

    return new Promise((resolve, reject) => {

        console.log("PDF GENERATOR STARTED");
        console.log(data);

        const fileName = `${data.quoteId}.pdf`;

        const folderPath = path.join(__dirname, "../quotes");


        // create folder if not exist
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }


        const filePath = path.join(folderPath, fileName);


        const doc = new PDFDocument();


        const stream = fs.createWriteStream(filePath);


        doc.pipe(stream);


        // PDF CONTENT

        doc
            .fontSize(22)
            .text("THREEDITRON", {
                align: "center"
            });


        doc.moveDown();


        doc
            .fontSize(16)
            .text("3D Printing Quotation", {
                align: "center"
            });


        doc.moveDown(2);


        doc.fontSize(12);


        doc.text(`Quote ID : ${data.quoteId}`);
        doc.text(`Date : ${data.date}`);
        doc.text(`Time : ${data.time}`);


        doc.moveDown();


        doc.text(`Customer Name : ${data.name}`);
        doc.text(`Phone : ${data.phone}`);
        doc.text(`Email : ${data.email}`);


        doc.moveDown();


        doc.text("----- Print Details -----");


        doc.text(`Material : ${data.material}`);
        doc.text(`Color : ${data.color}`);
        doc.text(`Quantity : ${data.quantity}`);
        doc.text(`Weight : ${data.weight} g`);
        doc.text(`Infill : ${data.infill}%`);
        doc.text(`Shipping : ${data.shipping}`);


        doc.moveDown();


        doc.text("-------------------------");


        doc.fontSize(16)
            .text(`Total Amount : ₹${data.totalPrice || "Calculated Later"}`);


        doc.end();



        stream.on("finish", () => {
            console.log("PDF SAVED:", filePath);
            resolve(filePath);

        });


        stream.on("error", (err) => {
            reject(err);
        });


    });

};


module.exports = generatePDF;