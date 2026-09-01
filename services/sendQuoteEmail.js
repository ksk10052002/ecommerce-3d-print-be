const transporter = require("./mailService");

async function sendQuoteEmail({
    customerName,
    customerEmail,
    quoteId,
    pdfPath
}) {

    await transporter.sendMail({

        from: `"THREEDITRON" <${process.env.SMTP_USER}>`,

        to: customerEmail,

        subject: `Your THREEDITRON 3D Printing Quotation (${quoteId})`,

        html: `
            <h2>Hello ${customerName},</h2>

            <p>Thank you for choosing <b>THREEDITRON</b>.</p>

            <p>Your quotation has been generated successfully.</p>

            <p><strong>Quote ID:</strong> ${quoteId}</p>

            <p>Please find your quotation attached as a PDF.</p>

            <br>

            <p>
                Regards,<br>
                <b>THREEDITRON</b><br>
                3D Printing Solutions
            </p>
        `,

        attachments: [
            {
                filename: `${quoteId}.pdf`,
                path: pdfPath
            }
        ]

    });

    console.log("✅ Email sent successfully.");

}

module.exports = sendQuoteEmail;