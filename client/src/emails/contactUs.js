export function generateContactEmailHTML(formData){
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Contact Form Message</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; text-align: center; margin: 0; width: 100%;">
            <div style="max-width: 600px; text-align: left;">
                <div>Dear admin,</div> <br/>
                <div>A new <strong>${formData.friendlyType}</strong> form submission has been received from the IPOINT Build website. </div><br/>
                <div>Here are the details:</div><br/>
                <div style="margin-bottom: 5px; margin-top:0;"><strong>Name:</strong> ${formData.name}</div>
                <div style="margin-bottom: 5px; margin-top:0;"><strong>Email:</strong> ${formData.email}</div>
                ${formData.phone ? `<div style="margin-bottom: 5px; margin-top:0;"><strong>Phone:</strong> ${formData.phone}</div>` : '' }
                ${formData.company ? `<div style="margin-bottom: 5px; margin-top:0;"><strong>Company name:</strong> ${formData.company}</div>` : ''}
                ${formData.brief ? `<div style="margin-bottom: 5px; margin-top:0;"><strong>Brief:</strong> ${formData.brief}</div>` : '' }
                ${formData.message ? `<div style="margin-bottom: 5px; margin-top:0;"><strong>Message:</strong> ${formData.message}</div>` : '' }
                ${formData.cv_letter ? `<div style="margin-bottom: 5px; margin-top:0;"><strong>Cover Letter:</strong> ${formData.cv_letter}</div>` : '' }
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