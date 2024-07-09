'use client'
import styles from '@/app/admin.scss'
import LeftBar from '@/components/(Admin)/LeftBar/LeftBar'
import {useAuth} from "@/hooks/UseAuth";

export default function AdminLayout({ children }) {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return false
    }

    return (
        <main className={`adminMain`}>
            <div className="admin-wrap">
                <div className="container">
                    <div className="fx fx-jb">
                        <LeftBar 
                            logoSrc="/admin/build-logo.svg"
                            logoWidth="62"
                            logoHeight="82"
                            user={user}
                        />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}