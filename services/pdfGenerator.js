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


        // const doc = new PDFDocument();
        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
        });


        const stream = fs.createWriteStream(filePath);


        doc.pipe(stream);

        // Page dimensions
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;

        // Theme Colors
        const PRIMARY = "#FFC107";
        const DARK = "#111827";
        const LIGHT = "#F3F4F6";
        const TEXT = "#374151";

        // ===========================
        // HEADER
        // ===========================

        // Black Header
        doc
            .rect(0, 0, pageWidth, 95)
            .fill(DARK);

        // Company Name
        doc
            .fillColor(PRIMARY)
            .font("Helvetica-Bold")
            .fontSize(28)
            .text("THREEDITRON", 40, 22);

        // Subtitle
        doc
            .fillColor("white")
            .font("Helvetica")
            .fontSize(11)
            .text("Professional 3D Printing & Rapid Prototyping", 42, 58);

        // Right Side Title
        doc
            .fillColor(PRIMARY)
            .font("Helvetica-Bold")
            .fontSize(22)
            .text("QUOTATION", 380, 30);

        // Reset Color
        doc.fillColor(TEXT);

        let y = 120;

        doc
            .roundedRect(40, y, 515, 70, 6)
            .fillAndStroke(LIGHT, "#DDDDDD");

        doc.fillColor(TEXT);

        doc
            .font("Helvetica-Bold")
            .fontSize(13)
            .text("Company Information", 55, y + 10);

        doc
            .font("Helvetica")
            .fontSize(10)
            .text("THREEDITRON", 55, y + 32)
            .text("Sidhgora, Jamshedpur, Jharkhand", 170, y + 32)
            .text("+91 7209827299", 55, y + 48)
            .text("www.threeditron.com", 170, y + 48);

        y += 95;

        doc
            .font("Helvetica-Bold")
            .fontSize(15)
            .fillColor(DARK)
            .text("Quotation Details", 40, y);

        y += 28;

        doc
            .font("Helvetica")
            .fontSize(11)
            .fillColor(TEXT);

        doc.text("Quotation ID", 50, y);
        doc.text(":", 170, y);
        doc.text(data.quoteId || "-", 190, y);

        doc.text("Date", 330, y);
        doc.text(":", 400, y);
        doc.text(data.date || "-", 420, y);

        y += 22;

        doc.text("Time", 50, y);
        doc.text(":", 170, y);
        doc.text(data.time || "-", 190, y);

        doc.text("Validity", 330, y);
        doc.text(":", 400, y);
        doc.text("7 Days", 420, y);

        y += 28;

        // Divider
        doc
            .moveTo(40, y)
            .lineTo(555, y)
            .strokeColor("#D1D5DB")
            .stroke();

        y += 20;

        // ===========================
        // CUSTOMER DETAILS
        // ===========================

        doc
            .roundedRect(40, y, 515, 110, 6)
            .fillAndStroke("#FFFFFF", "#DDDDDD");

        doc
            .fillColor(DARK)
            .font("Helvetica-Bold")
            .fontSize(14)
            .text("Customer Details", 55, y + 12);

        doc
            .font("Helvetica")
            .fontSize(11)
            .fillColor(TEXT);

        doc.text("Name", 60, y + 40);
        doc.text(":", 150, y + 40);
        doc.text(data.name || "-", 170, y + 40);

        doc.text("Phone", 60, y + 62);
        doc.text(":", 150, y + 62);
        doc.text(data.phone || "-", 170, y + 62);

        doc.text("Email", 60, y + 84);
        doc.text(":", 150, y + 84);
        doc.text(data.email || "-", 170, y + 84);

        y += 135;


        // ===========================
        // PRINT DETAILS
        // ===========================

        doc
            .roundedRect(40, y, 515, 170, 6)
            .fillAndStroke("#FFFFFF", "#DDDDDD");

        doc
            .fillColor(DARK)
            .font("Helvetica-Bold")
            .fontSize(14)
            .text("Print Details", 55, y + 12);

        doc
            .font("Helvetica")
            .fontSize(11)
            .fillColor(TEXT);

        let py = y + 40;

        doc.text("Material", 60, py);
        doc.text(":", 150, py);
        doc.text(String(data.material), 170, py);

        py += 22;

        doc.text("Color", 60, py);
        doc.text(":", 150, py);
        doc.text(String(data.color), 170, py);

        py += 22;

        doc.text("Weight", 60, py);
        doc.text(":", 150, py);
        doc.text(`${data.weight} g`, 170, py);

        py += 22;

        doc.text("Quantity", 60, py);
        doc.text(":", 150, py);
        doc.text(String(data.quantity), 170, py);

        py += 22;

        doc.text("Infill", 60, py);
        doc.text(":", 150, py);
        doc.text(`${data.infill}%`, 170, py);

        py += 22;

        doc.text("Shipping", 60, py);
        doc.text(":", 150, py);
        doc.text(String(data.shipping), 170, py);

        y += 195;


        // ===========================
        // PRICE BREAKDOWN
        // ===========================

        doc
            .font("Helvetica-Bold")
            .fontSize(15)
            .fillColor(DARK)
            .text("Price Breakdown", 40, y);

        y += 30;


        // Table Header

        doc
            .roundedRect(40, y, 515, 28, 4)
            .fill(PRIMARY);

        doc
            .fillColor("black")
            .font("Helvetica-Bold")
            .fontSize(11);

        doc.text("Description", 55, y + 8);

        doc.text("Amount", 455, y + 8);

        y += 28;


        // Row 1

        doc.rect(40, y, 515, 28).stroke("#DDDDDD");

        doc.font("Helvetica").fillColor(TEXT);

        doc.text("Material Cost", 55, y + 8);

        doc.text("₹135", 455, y + 8);


        // Row 2

        y += 28;

        doc.rect(40, y, 515, 28).stroke("#DDDDDD");

        doc.text("Infill Adjustment", 55, y + 8);

        doc.text("₹15", 455, y + 8);


        // Row 3

        y += 28;

        doc.rect(40, y, 515, 28).stroke("#DDDDDD");

        doc.text("Shipping Charges", 55, y + 8);

        doc.text("₹20", 455, y + 8);


        // Total Row

        y += 40;

        doc
            .roundedRect(40, y, 515, 38, 5)
            .fill(PRIMARY);

        doc
            .fillColor("black")
            .font("Helvetica-Bold")
            .fontSize(16);

        doc.text("Grand Total", 55, y + 11);

        doc.text("₹170", 430, y + 11);

        y += 60;

        // ===========================
        // NOTES
        // ===========================

        doc
            .roundedRect(40, y, 515, 90, 6)
            .fillAndStroke("#FFFDF5", "#E5E7EB");

        doc
            .fillColor(DARK)
            .font("Helvetica-Bold")
            .fontSize(14)
            .text("Important Notes", 55, y + 12);

        doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor(TEXT)
            .text("• This quotation is automatically generated based on the uploaded 3D model.", 60, y + 38)
            .text("• Final pricing may vary after engineering inspection.", 60, y + 54)
            .text("• Manufacturing starts only after payment confirmation.", 60, y + 70);

        y += 110;


        // ===========================
        // TERMS & CONDITIONS
        // ===========================

        doc
            .roundedRect(40, y, 515, 110, 6)
            .fillAndStroke("#FFFFFF", "#DDDDDD");

        doc
            .fillColor(DARK)
            .font("Helvetica-Bold")
            .fontSize(14)
            .text("Terms & Conditions", 55, y + 12);

        doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor(TEXT)
            .text("1. This quotation is valid for 7 days from the issue date.", 60, y + 38)
            .text("2. Material colour is subject to stock availability.", 60, y + 56)
            .text("3. Prices shown are estimated and may change after final inspection.", 60, y + 74)
            .text("4. THREEDITRON reserves the right to revise quotations if required.", 60, y + 92);

        y += 130;


        // ===========================
        // SIGNATURE SECTION
        // ===========================

        doc
            .moveTo(370, y + 35)
            .lineTo(530, y + 35)
            .strokeColor("#999999")
            .stroke();

        doc
            .font("Helvetica")
            .fontSize(10)
            .fillColor(TEXT)
            .text("Authorized Signature", 390, y + 40);

        y += 80;


        // ===========================
        // FOOTER
        // ===========================

        // Black Footer
        doc
            .rect(0, pageHeight - 80, pageWidth, 80)
            .fill(DARK);

        // Company Name
        doc
            .fillColor(PRIMARY)
            .font("Helvetica-Bold")
            .fontSize(16)
            .text("THREEDITRON", 40, pageHeight - 65);

        // Website
        doc
            .fillColor("white")
            .font("Helvetica")
            .fontSize(10)
            .text("www.threeditron.com", 40, pageHeight - 42);

        // Email
        doc
            .text("threeditron.1005@gmail.com", 220, pageHeight - 42);

        // Phone
        doc
            .text("+91 7209827299", 430, pageHeight - 42);

        // Copyright
        doc
            .fontSize(8)
            .fillColor("#BBBBBB")
            .text(
                "© 2026 THREEDITRON | Professional 3D Printing & Rapid Prototyping",
                40,
                pageHeight - 20,
                {
                    align: "center",
                    width: pageWidth - 80,
                }
            );

        // // PDF CONTENT

        // doc
        //     .fontSize(22)
        //     .text("THREEDITRON", {
        //         align: "center"
        //     });


        // doc.moveDown();


        // doc
        //     .fontSize(16)
        //     .text("3D Printing Quotation", {
        //         align: "center"
        //     });


        // doc.moveDown(2);


        // doc.fontSize(12);


        // doc.text(`Quote ID : ${data.quoteId}`);
        // doc.text(`Date : ${data.date}`);
        // doc.text(`Time : ${data.time}`);


        // doc.moveDown();


        // doc.text(`Customer Name : ${data.name}`);
        // doc.text(`Phone : ${data.phone}`);
        // doc.text(`Email : ${data.email}`);


        // doc.moveDown();


        // doc.text("----- Print Details -----");


        // doc.text(`Material : ${data.material}`);
        // doc.text(`Color : ${data.color}`);
        // doc.text(`Quantity : ${data.quantity}`);
        // doc.text(`Weight : ${data.weight} g`);
        // doc.text(`Infill : ${data.infill}%`);
        // doc.text(`Shipping : ${data.shipping}`);


        // doc.moveDown();


        // doc.text("-------------------------");


        // doc.fontSize(16)
        // .font("Helvetica-Bold")
        // .text(`Total Amount : ₹${data.totalPrice || "Calculated Later"}`);


        doc.end();



        // stream.on("finish", () => {
        //     console.log("PDF SAVED:", filePath);
        //     resolve(filePath);

        // });


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


//         const folderPath = path.join(
//             __dirname,
//             "../quotes"
//         );


//         const logoPath = path.join(
//             __dirname,
//             "../assets/threeditron-logo.png"
//         );



//         // Create quotes folder

//         if (!fs.existsSync(folderPath)) {
//             fs.mkdirSync(folderPath);
//         }



//         const filePath = path.join(
//             folderPath,
//             fileName
//         );



//         const doc = new PDFDocument({

//             size: "A4",
//             margin: 50

//         });



//         const stream = fs.createWriteStream(filePath);


//         doc.pipe(stream);




//         /*
//         =================================
//         HEADER
//         =================================
//         */


//         if (fs.existsSync(logoPath)) {

//             doc.image(
//                 logoPath,
//                 50,
//                 45,
//                 {
//                     width: 90
//                 }
//             );

//         }



//         doc
//             .fontSize(22)
//             .font("Helvetica-Bold")
//             .text(
//                 "THREEDITRON",
//                 170,
//                 45
//             );



//         doc
//             .fontSize(10)
//             .font("Helvetica")
//             .text(
//                 `
// 3D Printing & Rapid Prototyping Solutions

// GSTIN : YOUR_GST_NUMBER
// Jamshedpur, Jharkhand, India

// Email : support@threeditron.com
// Website : www.threeditron.com
// `,
//                 170,
//                 75
//             );




//         doc
//             .moveTo(50, 150)
//             .lineTo(545, 150)
//             .stroke();




//         /*
//         =================================
//         TITLE
//         =================================
//         */


//         doc.moveDown(3);


//         doc
//             .fontSize(18)
//             .font("Helvetica-Bold")
//             .text(
//                 "3D PRINTING QUOTATION",
//                 {
//                     align: "center"
//                 }
//             );


//         doc.moveDown(2);




//         /*
//         =================================
//         QUOTE INFORMATION
//         =================================
//         */


//         doc
//             .fontSize(12)
//             .font("Helvetica-Bold")
//             .text(
//                 "Quotation Details"
//             );


//         doc.moveDown(0.5);


//         doc
//             .font("Helvetica")
//             .fontSize(11)
//             .text(
//                 `
// Quote ID        : ${data.quoteId}
// Generated Date  : ${data.date}
// Generated Time  : ${data.time}
// `
//             );



//         doc.moveDown(1);




//         /*
//         =================================
//         CUSTOMER DETAILS
//         =================================
//         */


//         doc
//             .font("Helvetica-Bold")
//             .fontSize(12)
//             .text(
//                 "Customer Information"
//             );


//         doc.moveDown(0.5);



//         doc
//             .font("Helvetica")
//             .fontSize(11)
//             .text(
//                 `
// Customer Name : ${data.name}
// Phone         : ${data.phone}
// Email         : ${data.email}
// `
//             );



//         doc.moveDown(1.5);




//         /*
//         =================================
//         PRINT DETAILS TABLE
//         =================================
//         */



//         doc
//             .font("Helvetica-Bold")
//             .fontSize(12)
//             .text(
//                 "Print Specifications"
//             );


//         doc.moveDown(0.5);



//         const tableX = 50;
//         let y = doc.y;


//         const rowHeight = 25;



//         function createRow(title, value) {


//             doc
//                 .rect(
//                     tableX,
//                     y,
//                     495,
//                     rowHeight
//                 )
//                 .stroke();



//             doc
//                 .font("Helvetica-Bold")
//                 .fontSize(10)
//                 .text(
//                     title,
//                     tableX + 10,
//                     y + 8
//                 );



//             doc
//                 .font("Helvetica")
//                 .text(
//                     value,
//                     tableX + 200,
//                     y + 8
//                 );


//             y += rowHeight;

//         }




//         createRow(
//             "Material",
//             data.material || "-"
//         );


//         createRow(
//             "Color",
//             data.color || "-"
//         );


//         createRow(
//             "Quantity",
//             data.quantity || "-"
//         );


//         createRow(
//             "Weight",
//             `${data.weight || 0} grams`
//         );


//         createRow(
//             "Infill",
//             `${data.infill || 0}%`
//         );


//         createRow(
//             "Shipping",
//             data.shipping || "-"
//         );



//         doc.moveDown(2);




//         /*
//         =================================
//         PRICE DETAILS
//         =================================
//         */



//         doc
//             .fontSize(12)
//             .font("Helvetica-Bold")
//             .text(
//                 "Price Summary"
//             );


//         doc.moveDown(0.5);



//         const subtotal =
//             Number(data.subtotal || data.totalPrice || 0);



//         const gst =
//             Number(data.gst || subtotal * 0.18);



//         const grandTotal =
//             subtotal + gst;




//         doc
//             .font("Helvetica")
//             .fontSize(11)
//             .text(
//                 `
// Printing Cost       : ₹${subtotal.toFixed(2)}

// GST (18%)           : ₹${gst.toFixed(2)}

// --------------------------------------

// Grand Total         : ₹${grandTotal.toFixed(2)}
// `
//             );



//         doc.moveDown(2);




//         /*
//         =================================
//         TERMS
//         =================================
//         */


//         doc
//             .font("Helvetica-Bold")
//             .fontSize(12)
//             .text(
//                 "Terms & Conditions"
//             );


//         doc.moveDown(0.5);



//         doc
//             .font("Helvetica")
//             .fontSize(10)
//             .text(
//                 `
// • Quotation validity: 7 days from the date of issue.

// • Final cost may vary depending on design complexity.

// • Production will start after customer approval.

// • Custom modifications may include additional charges.

// • Delivery timeline depends on order quantity.
// `
//             );




//         doc.moveDown(2);




//         /*
//         =================================
//         FOOTER
//         =================================
//         */



//         doc
//             .fontSize(10)
//             .font("Helvetica-Bold")
//             .text(
//                 "Thank you for choosing THREEDITRON",
//                 {
//                     align: "center"
//                 }
//             );



//         doc
//             .fontSize(9)
//             .font("Helvetica")
//             .text(
//                 `
// THREEDITRON
// GST Registered 3D Printing Service

// www.threeditron.com
// support@threeditron.com
// `,
//                 {
//                     align: "center"
//                 }
//             );




//         doc.end();




//         stream.on(
//             "finish",
//             () => {

//                 console.log(
//                     "PDF SAVED:",
//                     filePath
//                 );


//                 resolve(filePath);

//             }
//         );



//         stream.on(
//             "error",
//             (err) => {

//                 reject(err);

//             }
//         );



//     });

// };



// module.exports = generatePDF;