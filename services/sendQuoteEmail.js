const transporter = require("./mailService");

async function sendQuoteEmail(data) {
    try {
        const info = await transporter.sendMail({
            from: `"THREEDITRON" <${process.env.SMTP_USER}>`,
            to: data.customerEmail,
            subject: `Your THREEDITRON Quote (${data.quoteId})`,
            html: `<h2>Hello ${data.customerName}</h2>`,
            attachments: [
                {
                    filename: `${data.quoteId}.pdf`,
                    path: data.pdfPath
                }
            ]
        });

        console.log("✅ Email sent:", info.response);

    } catch (err) {
        console.error("❌ Email Error:", err);
        throw err;
    }
}

module.exports = sendQuoteEmail;