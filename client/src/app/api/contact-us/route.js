import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import {generateContactEmailHTML} from "@/emails/contactUs";
import {generateUserContactEmailHTML} from "@/emails/contactUsUser";

export async function POST(request){
    const formData = await request.formData();
    const type = formData.get('type');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const company = formData.get('company');
    const brief = formData.get('brief');
    const message = formData.get('message');
    const cv = formData.get('cv');
    const file = formData.get('file');
    const cv_letter = formData.get('cv_letter');
    const attachment = [];
    const attachment2 = [];
    const interested = [];
    let index = 0;
    let friendlyType = '';

    if( type ){
        switch (type){
            case 'workWithUs':
                friendlyType = 'Get a Quote';
                break;
            case 'collaboration':
                friendlyType = 'Collaboration';
                break;
            case 'joinTheTeam':
                friendlyType = 'Join the Team';
                break;
        }
    }

    while (formData.has(`interested[${index}]`)) {
        interested.push(...formData.getAll(`interested[${index}]`).map(item => item.trim()));
        index++;
    }

    const interestedWithCommas = interested.join(', ');

    console.log(process.env.BUILD_EMAIL, process.env.BUILD_PASSWORD);

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

    // Send a test email to verify the configuration
    transport.sendMail({
        from: process.env.BUILD_EMAIL,
        to: 'anahit@ipoint.com.mt',
        subject: 'Test Email',
        text: 'This is a test email.',
    }, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

    if( cv ){
        const fileExtension = cv.name.split('.').pop(); // Extract file extension
        const fileBuffer = await cv.arrayBuffer();
        const fileArray = new Uint8Array(fileBuffer);

        attachment.push({
            filename: `document.${fileExtension}`,
            content: fileArray,
        });
    }

    if( file ){
        const fileExtension = file.name.split('.').pop(); // Extract file extension
        const fileBuffer = await file.arrayBuffer();
        const fileArray = new Uint8Array(fileBuffer);

        attachment2.push({
            filename: `document.${fileExtension}`,
            content: fileArray,
        });
    }

    const emailHTML = generateContactEmailHTML({
        interested,
        interestedWithCommas,
        name,
        company,
        email,
        phone,
        brief,
        message,
        cv_letter,
        type,
        friendlyType
    });

    const mailOptions = {
        from: process.env.BUILD_EMAIL,
        to: process.env.BUILD_COMPANY_EMAIL,
        subject: `A New Contact Form Submission Has Been Received from IPOINT Build`,
        html: emailHTML
    };

    if( attachment.length !== 0 ){
        mailOptions.attachments = attachment
    }

    if(attachment2.length !== 0){
        mailOptions.attachments = attachment2
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

    // Send email to the user
    const emailUserHTML = generateUserContactEmailHTML({
        interested,
        interestedWithCommas,
        name,
        company,
        email,
        phone,
        brief,
        message,
        cv_letter,
        type,
        friendlyType
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

    if(attachment2.length !== 0){
        userMailOptions.attachments = attachment2
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