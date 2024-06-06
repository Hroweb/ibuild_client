export function generateSubscriberEmailAdminHTML(formData){
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Thank you</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; text-align: center; margin: 0; width: 100%;">
            <div style="max-width: 600px; text-align: left;">
                <div>Dear admin,</div> <br/>
                <div>A new user has subscribed to IPOINT Build. Here are the details:</div><br/>
                <div><strong>Email:</strong> ${formData.email}</div><br/>
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