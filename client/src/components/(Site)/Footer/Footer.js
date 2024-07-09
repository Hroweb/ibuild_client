import styles from '@/components/(Site)/Footer/Footer.scss'
import { Logo, LogoText, Facebook, Linkedin, Instagram } from '@/components/svgs/index'
import SubscribeForm from '@/components/(Site)/SubscribeForm/SubscribeForm'
import Video from './FooterVideo'
import Link from "next/link";
import Social from "@/components/(Site)/MainNav/Social";

const Footer = () => {
    return (
        <footer>
            <div className="ft-bg-video">
                <div className="ft-bg-video-wrap">
                    <Video src="/animations/footer-anim.mp4"/>
                </div>
            </div>
            <div className="ft-wrapper">
                <div className="container">
                    <div className="ft-wrap">
                        <h6>
                            <Link href="/contact-us">LET’S TALK</Link>
                        </h6>
                        <div className="ft-row fx fx-wrap fx-jb">
                            <div className="ft-col">
                                <div className="logo">
                                    <Link href="/" className="fx fx-wrap">
                                        <Logo />
                                        <LogoText />
                                    </Link>
                                </div>
                                <Social footer={true} />
                            </div>
                            <div className="ft-col">
                                <div className="ft-col-wrap">
                                    <h5>Company</h5>
                                    <div className="ft-menu">
                                        <ul>
                                            <li><Link href="/">Home</Link></li>
                                            <li><Link href="/about-us">About Us</Link></li>
                                            <li><Link href="/services">Services</Link></li>
                                            <li><Link href="/portfolio">Portfolio</Link></li>
                                            <li><Link href="/contact-us">Contact Us</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="ft-col">
                                <div className="ft-col-wrap">
                                    <h5>Help</h5>
                                    <div className="ft-menu">
                                        <ul>
                                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                            <li><Link href="/cookie-policy">Cookie Policy</Link></li>
                                            <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="ft-col">
                                <div className="ft-col-wrap">
                                    <h5>Subscribe to newsletter</h5>
                                    <SubscribeForm />
                                </div>
                            </div>
                        </div>
                        <div className="ft-row-cp">
                            <p>&copy;  IPOINT INT Ltd. {new Date().getFullYear()}. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;