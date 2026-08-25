const PDFDocument = require("pdfkit");

const generateQuotePDF = (quote) => {

    const doc = new PDFDocument();

    doc.fontSize(20)
        .text("THREEDITRON", {
            align: "center"
        });

    doc.moveDown();

    doc.fontSize(14)
        .text("3D Printing Quotation", {
            align: "center"
        });


    doc.moveDown(2);


    doc.fontSize(12);

    doc.text(`Quote ID: ${quote.quoteId}`);
    doc.text(`Date: ${quote.date}`);
    doc.text(`Time: ${quote.time}`);


    doc.moveDown();


    doc.text(`Customer Name: ${quote.name}`);
    doc.text(`Phone: ${quote.phone}`);
    doc.text(`Email: ${quote.email}`);


    doc.moveDown();


    doc.text("Print Details");

    doc.text(`Material: ${quote.material}`);
    doc.text(`Color: ${quote.color}`);
    doc.text(`Quantity: ${quote.quantity}`);
    doc.text(`Weight: ${quote.weight} grams`);
    doc.text(`Infill: ${quote.infill}`);
    doc.text(`Shipping: ${quote.shipping}`);


    doc.moveDown();


    doc.text(`STL File: ${quote.fileName}`);


    doc.moveDown(2);


    doc.text(
        "Thank you for choosing THREEDITRON.",
        {
            align: "center"
        }
    );


    return doc;
};


module.exports = {
    generateQuotePDF
};