const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


const logoPath = path.join(
    __dirname,
    "../assets/threeditron.png"
);


const generatePDF = (data) => {

    return new Promise((resolve, reject) => {

        console.log("PDF GENERATOR STARTED");
        console.log(data);


        const fileName = `${data.quoteId}.pdf`;

        const folderPath = path.join(__dirname, "../quotes");


        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }


        const filePath = path.join(folderPath, fileName);


        const doc = new PDFDocument({
            size: "A4",
            margin: 50
        });


        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);



        // ==========================
        // HEADER WITH LOGO
        // ==========================


        if (fs.existsSync(logoPath)) {

            doc.image(
                logoPath,
                220,
                40,
                {
                    width: 150
                }
            );

        }


        doc.moveDown(5);


        doc
            .fontSize(11)
            .font("Helvetica")
            .text(
                "3D Printing | Rapid Prototyping | Custom Manufacturing",
                {
                    align: "center"
                }
            );


        doc.moveDown();


        doc
            .fontSize(18)
            .font("Helvetica-Bold")
            .text(
                "QUOTATION",
                {
                    align: "center"
                }
            );



        // ==========================
        // QUOTE INFORMATION BOX
        // ==========================


        doc.fontSize(11)
            .font("Helvetica-Bold")
            .text("Quote Information");


        doc.moveDown(0.5);


        doc.font("Helvetica");

        doc.text(`Quote ID : ${data.quoteId}`);
        doc.text(`Date : ${data.date}`);
        doc.text(`Time : ${data.time}`);



        doc.moveDown();



        // ==========================
        // CUSTOMER DETAILS
        // ==========================


        doc.font("Helvetica-Bold")
            .text("Customer Details");


        doc.moveDown(0.5);


        doc.font("Helvetica");

        doc.text(`Name : ${data.name}`);
        doc.text(`Phone : ${data.phone}`);
        doc.text(`Email : ${data.email}`);



        doc.moveDown(1.5);



        // ==========================
        // PRINT DETAILS TABLE
        // ==========================


        doc.font("Helvetica-Bold")
            .text("Print Specifications");


        doc.moveDown();



        const startY = doc.y;


        doc.fontSize(11);



        const details = [

            ["Material", data.material],
            ["Color", data.color],
            ["Quantity", data.quantity],
            ["Weight", `${data.weight} g`],
            ["Infill", `${data.infill}%`],
            ["Shipping", data.shipping]

        ];



        details.forEach(row => {


            doc.font("Helvetica-Bold")
                .text(row[0], 70, doc.y);


            doc.font("Helvetica")
                .text(row[1], 220, doc.y - 13);


            doc.moveDown();


        });



        doc.moveDown();



        // ==========================
        // PRICE SECTION
        // ==========================



        doc.fontSize(16)
            .font("Helvetica-Bold")
            .text(
                `TOTAL AMOUNT : ₹${data.totalPrice || "Pending Calculation"}`
            );



        doc.moveDown(2);



        // ==========================
        // TERMS
        // ==========================


        doc.fontSize(11)
            .font("Helvetica-Bold")
            .text("Terms & Conditions");


        doc.font("Helvetica")
            .fontSize(10);


        const terms = [

            "• Final price may vary depending on design complexity.",
            "• Printing time depends on model size and selected settings.",
            "• Customer approval is required before production.",
            "• Custom designs are non-refundable after production starts."

        ];


        terms.forEach(t => {
            doc.text(t);
        });



        doc.moveDown(2);



        // ==========================
        // FOOTER
        // ==========================


        doc.fontSize(10)
            .text(
                "Thank you for choosing THREEDITRON",
                {
                    align: "center"
                }
            );


        doc.text(
            "www.threeditron.com | threeditron.1005@gmail.com",
            {
                align: "center"
            }
        );



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

















// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");


// const generatePDF = (data) => {

//     return new Promise((resolve, reject) => {

//         console.log("PDF GENERATOR STARTED");
//         console.log(data);

//         const fileName = `${data.quoteId}.pdf`;

//         const folderPath = path.join(__dirname, "../quotes");


//         // create folder if not exist
//         if (!fs.existsSync(folderPath)) {
//             fs.mkdirSync(folderPath);
//         }


//         const filePath = path.join(folderPath, fileName);


//         const doc = new PDFDocument();


//         const stream = fs.createWriteStream(filePath);


//         doc.pipe(stream);


//         // PDF CONTENT

//         doc
//             .fontSize(22)
//             .text("THREEDITRON", {
//                 align: "center"
//             });


//         doc.moveDown();


//         doc
//             .fontSize(16)
//             .text("3D Printing Quotation", {
//                 align: "center"
//             });


//         doc.moveDown(2);


//         doc.fontSize(12);


//         doc.text(`Quote ID : ${data.quoteId}`);
//         doc.text(`Date : ${data.date}`);
//         doc.text(`Time : ${data.time}`);


//         doc.moveDown();


//         doc.text(`Customer Name : ${data.name}`);
//         doc.text(`Phone : ${data.phone}`);
//         doc.text(`Email : ${data.email}`);


//         doc.moveDown();


//         doc.text("----- Print Details -----");


//         doc.text(`Material : ${data.material}`);
//         doc.text(`Color : ${data.color}`);
//         doc.text(`Quantity : ${data.quantity}`);
//         doc.text(`Weight : ${data.weight} g`);
//         doc.text(`Infill : ${data.infill}%`);
//         doc.text(`Shipping : ${data.shipping}`);


//         doc.moveDown();


//         doc.text("-------------------------");


//         doc.fontSize(16)
//             .text(`Total Amount : ₹${data.totalPrice || "Calculated Later"}`);


//         doc.end();



//         stream.on("finish", () => {
//             console.log("PDF SAVED:", filePath);
//             resolve(filePath);

//         });


//         stream.on("error", (err) => {
//             reject(err);
//         });


//     });

// };


// module.exports = generatePDF;