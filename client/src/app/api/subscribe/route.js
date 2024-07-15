//import { promisify } from 'util';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateSubscriberEmailHTML } from '@/emails/getSubscriber';
import { generateSubscriberEmailAdminHTML } from '@/emails/getSubscriberAdmin';
/*import { access } from 'fs/promises';
import fs from 'fs';*/

//const createWriteStreamAsync = promisify(fs.createWriteStream);

export async function POST(request) {
    const formData = await request.formData();
    const email = formData.get('email');
    if (!email || !isValidEmail(email)) {
        return {
            status: 400,
            body: JSON.stringify({ error: 'Invalid email address' }),
        };
    }

    const transport = nodemailer.createTransport({
        //service: 'gmail',
        host: "it1.fcomet.com",
        port: 465,
        secure: true,
        auth: {
            user: 'hello@build.events',
            pass: 'zgE!$4P3Nffc',
        },
        logger: true,
        debug: true,
    })

    const emailHTML = generateSubscriberEmailHTML({
        email,
    });

    const userMailOptions = {
        from: process.env.BUILD_EMAIL,
        to: email,
        subject: `Thank You for Subscribing to IPOINT Build.`,
        html: emailHTML,
    };

    const sendUserMailPromise = () =>
        new Promise((resolve, reject) => {
            transport.sendMail(userMailOptions, function (err) {
                if (!err) {
                    resolve('Email sent to the user');
                } else {
                    reject(err.message);
                }
            });
        });

    const emailAdminHTML = generateSubscriberEmailAdminHTML({
        email,
    });

    const adminMailOptions = {
        from: process.env.BUILD_EMAIL,
        to: process.env.BUILD_COMPANY_EMAIL,
        subject: `A New Subscription to IPOINT Build Has Been Received`,
        html: emailAdminHTML,
    };

    const sendAdminMailPromise = () =>
        new Promise((resolve, reject) => {
            transport.sendMail(adminMailOptions, function (err) {
                if (!err) {
                    resolve('Email sent to the user');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        // Send the user an email
        await sendUserMailPromise();
        await sendAdminMailPromise();

        return NextResponse.json({ message: 'Subscription successful' });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

function isValidEmail(email) {
    // You can implement a more robust email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}