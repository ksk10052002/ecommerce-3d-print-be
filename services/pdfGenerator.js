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
//         .font("Helvetica-Bold")
//         .text(`Total Amount : ₹${data.totalPrice || "Calculated Later"}`);


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

































































const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


const generatePDF = (data) => {

    return new Promise((resolve, reject) => {


        console.log("PDF GENERATOR STARTED");
        console.log(data);



        const fileName = `${data.quoteId}.pdf`;


        const folderPath = path.join(
            __dirname,
            "../quotes"
        );


        const logoPath = path.join(
            __dirname,
            "../assets/threeditron-logo.png"
        );



        // Create quotes folder

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }



        const filePath = path.join(
            folderPath,
            fileName
        );



        const doc = new PDFDocument({

            size: "A4",
            margin: 50

        });



        const stream = fs.createWriteStream(filePath);


        doc.pipe(stream);




        /*
        =================================
        HEADER
        =================================
        */


        if (fs.existsSync(logoPath)) {

            doc.image(
                logoPath,
                50,
                45,
                {
                    width: 90
                }
            );

        }



        doc
            .fontSize(22)
            .font("Helvetica-Bold")
            .text(
                "THREEDITRON",
                170,
                45
            );



        doc
            .fontSize(10)
            .font("Helvetica")
            .text(
                `
3D Printing & Rapid Prototyping Solutions

GSTIN : YOUR_GST_NUMBER
Jamshedpur, Jharkhand, India

Email : support@threeditron.com
Website : www.threeditron.com
`,
                170,
                75
            );




        doc
            .moveTo(50, 150)
            .lineTo(545, 150)
            .stroke();




        /*
        =================================
        TITLE
        =================================
        */


        doc.moveDown(3);


        doc
            .fontSize(18)
            .font("Helvetica-Bold")
            .text(
                "3D PRINTING QUOTATION",
                {
                    align: "center"
                }
            );


        doc.moveDown(2);




        /*
        =================================
        QUOTE INFORMATION
        =================================
        */


        doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .text(
                "Quotation Details"
            );


        doc.moveDown(0.5);


        doc
            .font("Helvetica")
            .fontSize(11)
            .text(
                `
Quote ID        : ${data.quoteId}
Generated Date  : ${data.date}
Generated Time  : ${data.time}
`
            );



        doc.moveDown(1);




        /*
        =================================
        CUSTOMER DETAILS
        =================================
        */


        doc
            .font("Helvetica-Bold")
            .fontSize(12)
            .text(
                "Customer Information"
            );


        doc.moveDown(0.5);



        doc
            .font("Helvetica")
            .fontSize(11)
            .text(
                `
Customer Name : ${data.name}
Phone         : ${data.phone}
Email         : ${data.email}
`
            );



        doc.moveDown(1.5);




        /*
        =================================
        PRINT DETAILS TABLE
        =================================
        */



        doc
            .font("Helvetica-Bold")
            .fontSize(12)
            .text(
                "Print Specifications"
            );


        doc.moveDown(0.5);



        const tableX = 50;
        let y = doc.y;


        const rowHeight = 25;



        function createRow(title, value) {


            doc
                .rect(
                    tableX,
                    y,
                    495,
                    rowHeight
                )
                .stroke();



            doc
                .font("Helvetica-Bold")
                .fontSize(10)
                .text(
                    title,
                    tableX + 10,
                    y + 8
                );



            doc
                .font("Helvetica")
                .text(
                    value,
                    tableX + 200,
                    y + 8
                );


            y += rowHeight;

        }




        createRow(
            "Material",
            data.material || "-"
        );


        createRow(
            "Color",
            data.color || "-"
        );


        createRow(
            "Quantity",
            data.quantity || "-"
        );


        createRow(
            "Weight",
            `${data.weight || 0} grams`
        );


        createRow(
            "Infill",
            `${data.infill || 0}%`
        );


        createRow(
            "Shipping",
            data.shipping || "-"
        );



        doc.moveDown(2);




        /*
        =================================
        PRICE DETAILS
        =================================
        */



        doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .text(
                "Price Summary"
            );


        doc.moveDown(0.5);



        const subtotal =
            Number(data.subtotal || data.totalPrice || 0);



        const gst =
            Number(data.gst || subtotal * 0.18);



        const grandTotal =
            subtotal + gst;




        doc
            .font("Helvetica")
            .fontSize(11)
            .text(
                `
Printing Cost       : ₹${subtotal.toFixed(2)}

GST (18%)           : ₹${gst.toFixed(2)}

--------------------------------------

Grand Total         : ₹${grandTotal.toFixed(2)}
`
            );



        doc.moveDown(2);




        /*
        =================================
        TERMS
        =================================
        */


        doc
            .font("Helvetica-Bold")
            .fontSize(12)
            .text(
                "Terms & Conditions"
            );


        doc.moveDown(0.5);



        doc
            .font("Helvetica")
            .fontSize(10)
            .text(
                `
• Quotation validity: 7 days from the date of issue.

• Final cost may vary depending on design complexity.

• Production will start after customer approval.

• Custom modifications may include additional charges.

• Delivery timeline depends on order quantity.
`
            );




        doc.moveDown(2);




        /*
        =================================
        FOOTER
        =================================
        */



        doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .text(
                "Thank you for choosing THREEDITRON",
                {
                    align: "center"
                }
            );



        doc
            .fontSize(9)
            .font("Helvetica")
            .text(
                `
THREEDITRON
GST Registered 3D Printing Service

www.threeditron.com
support@threeditron.com
`,
                {
                    align: "center"
                }
            );




        doc.end();




        stream.on(
            "finish",
            () => {

                console.log(
                    "PDF SAVED:",
                    filePath
                );


                resolve(filePath);

            }
        );



        stream.on(
            "error",
            (err) => {

                reject(err);

            }
        );



    });

};



module.exports = generatePDF;