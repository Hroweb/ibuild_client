import styles from '@/components/(Site)/(Pages)/(Privacy)/Content/Content.module.scss'
import Link from 'next/link'

const Content = ({date}) => {
    return(
        <section className={`pg-section pg-section-pd bg-light`}>
            <div className="container">
                <div className={`${styles['pv-ct-wrap']}`}>
                    <h2>Last updated: {date}</h2>
                    <p>Welcome to IPOINT Build&apos;s website located at <Link href="https://www.build.events/">https://www.build.events/</Link> (the &quot;Site&quot;). By accessing or using the Site, you agree to comply with and be bound by the following terms and conditions of use. If you do not agree to these terms, please do not use the Site.</p>
                    <h2>1. Services</h2>
                    <p>Details about our services can be found on our <Link href="/services">Services</Link> page. By utilising our services, you agree to abide by the terms outlined on this page.</p>
                    <h2>2. Billing and Payment</h2>
                    <p>Billing and payment terms will be discussed and agreed upon in person with our clients.</p>
                    <h2>3. Subscription Services</h2>
                    <p>We offer subscription services, such as newsletters. Users can subscribe to our newsletters, and if they wish to unsubscribe, they can contact us through the provided channels.</p>
                    <h2>4. Refund and Cancellation</h2>
                    <p>Refund and cancellation policies will be discussed and agreed upon in person with our clients.</p>
                    <h2>5. User Accounts and User-Generated Content</h2>
                    <p>Our website does not require user accounts, and we do not host user-generated content (UGC) on our platform.</p>
                    <h2>6. Limited Company</h2>
                    <p>IPOINT Build is a limited company.</p>
                    <h2>7. Privacy and Data Protection</h2>
                    <p>We are committed to keeping user data private. Our privacy practices are outlined in our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
                    <h2>8. Disclaimers and Limitations of Liability</h2>
                    <p>Our website and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We disclaim all warranties of any kind, whether express or implied. To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</p>
                    <h2>9. Governing Law</h2>
                    <p>These Terms and Conditions are governed by and construed in accordance with the laws of Malta.</p>
                    <h2>10. Contact Information</h2>
                    <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                    <ul>
                        <li>By email: <Link href="mailto:info@ipoint.com.mt">info@ipoint.com.mt</Link></li>
                        <li>By visiting this page on our website: <Link href="/contact-us">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Content;