export function generateSubscriberEmailHTML(formData){
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Thank you</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; text-align: center; margin: 0; width: 100%;">
            <div style="max-width: 600px; text-align: left;">
                <div>Dear Subscriber,</div> <br/>
                <div>Thank you for subscribing to IPOINT Build! We're thrilled to have you on board. Stay tuned for our latest updates, industry insights, and exciting news.</div><br/>
                <div>Welcome to our community!</div><br/>
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