export function generateQuoteEmailHTML(formData) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Get a Quote Form Message</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; text-align: center; margin: 0; width: 100%;">
            <div style="max-width: 600px; text-align: left;">
                <div>Dear admin,</div> <br/>
                <div>A new Get a Quote form submission has been reeceived from the IPOINT Build website. </div><br/>
                <div>Here are the details:</div><br/>
                <div style="margin-bottom: 5px; margin-top:0;"><strong>Name:</strong> ${formData.name}</div>
                ${formData.company ? `<div style="margin-bottom: 5px; margin-top:0;"><strong>Company name:</strong> ${formData.company}</div>` : ''}
                <div style="margin-bottom: 5px; margin-top:0;"><strong>Phone:</strong> ${formData.phone}</div>
                <div style="margin-bottom: 5px; margin-top:0;"><strong>Email:</strong> ${formData.email}</div>
                <div style="margin-bottom: 5px; margin-top:0;"><strong>Message:</strong> ${formData.brief}</div>
                ${formData.interested.length > 0 ? `<div style="margin-bottom: 5px; margin-top:0;"><strong>Area of interest:</strong> ${formData.interestedWithCommas}</div>` : ''}<br/>
                <div>Thank you for your attention to this matter.</div><br/>
                <div>Best Regards,</div><br/>
                <img style="margin-bottom:10px;" width="60" height="78" src="https://www.build.events/images/ipointbuild-email-logo.png" alt="IPOINT Build logo"/>
                <br/>
                <div>IPOINT Build</div>
                <div>42, Triq L-Amaroz, Mgarr, Malta (Europe)</div>
            </div>
        </body>
        </html>
    `;
}