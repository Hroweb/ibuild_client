'use client'
import styles from './LeftBar.module.scss'
import Link from 'next/link'
import Image from "next/image"
import LeftMenu from '@/components/(Admin)/LeftMenu/LeftMenu'
import { AvatarIcon } from '@/components/svgs/admin'
import {useAuth} from "@/hooks/UseAuth";

const LeftBar = ({logoSrc, logoWidth, logoHeight, user}) => {
    const { logout } = useAuth({});

    const handleLogout = (e) => {
        e.preventDefault();
        logout().then(r => '');
    };
    return (
        <div className={`${styles['admin-lcol']}`}>
            <div className={`${styles['admin-hd']} fx fx-ac`}>
                <Link href="/admin">
                    <Image src={logoSrc} alt="IPOINT Build logo" width={logoWidth} height={logoHeight} />
                </Link>
            </div>
            <div className={`${styles['admin-menu']}`}>
                <LeftMenu />
            </div>
            <div className={`${styles['admin-bar-row']}`}>
                <div className={`${styles['admin-bar']}`}>
                    <div className={`${styles['admin-bar-info']} fx fx-ac`}>
                        <div className={`${styles['admin-avatar']} fx fx-jc fx-ac`}>
                            <AvatarIcon />
                        </div>
                        <span>{`${user?.name ?? 'Admin'}`} | <Link href="#" onClick={handleLogout}>Logout</Link></span>
                    </div>
                </div>
                <div className={`${styles['admin-cpr']}`}>
                    <p>&copy;  IPOINT INT Ltd. {new Date().getFullYear()}. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;