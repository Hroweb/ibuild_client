import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { generateQuoteEmailHTML } from '@/emails/getQuote';
import { generateUserQuoteEmailHTML } from '@/emails/getQuoteUser'

export async function POST(request){
    const formData = await request.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const brief = formData.get('brief');
    const company = formData.get('company');
    const file = formData.get('file');
    const attachment = [];
    const interested = [];
    let index = 0;

    while (formData.has(`interested[${index}]`)) {
        interested.push(...formData.getAll(`interested[${index}]`));
        index++;
    }

    const interestedWithCommas = interested.join(', ');

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
    });

    if( file ){
        const fileExtension = file.name.split('.').pop(); // Extract file extension
        const fileBuffer = await file.arrayBuffer();
        const fileArray = new Uint8Array(fileBuffer);

        attachment.push({
            filename: `document.${fileExtension}`,
            content: fileArray,
        });
    }

    const emailHTML = generateQuoteEmailHTML({
        interested,
        interestedWithCommas,
        name,
        company,
        email,
        phone,
        brief
    });

    const mailOptions = {
        from: process.env.BUILD_EMAIL,
        to: process.env.BUILD_COMPANY_EMAIL,
        subject: `A New Get a Quote Form Submission Has Been Received from IPOINT Build`,
        html: emailHTML
    };

    if( attachment.length !== 0 ){
        mailOptions.attachments = attachment
    }

    const sendMailPromise = () =>
        new Promise((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
    });

    const emailUserHTML = generateUserQuoteEmailHTML({
        interested,
        interestedWithCommas,
        name,
        company,
        email,
        phone,
        brief
    });

    const userMailOptions = {
        from: process.env.BUILD_EMAIL,
        to: email, // Use the user's email address here
        subject: `Thank You for Reaching Out to IPOINT Build`,
        html: emailUserHTML
    };

    if( attachment.length !== 0 ){
        userMailOptions.attachments = attachment
    }

    const sendUserMailPromise = () =>
        new Promise((resolve, reject) => {
            transport.sendMail(userMailOptions, function (err) {
                if (!err) {
                    resolve('Email sent to user');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        await sendUserMailPromise();
        return NextResponse.json({ message: 'Email sent' });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}