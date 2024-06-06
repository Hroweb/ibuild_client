import styles from '@/app/admin.scss'
import LeftBar from '@/components/(Admin)/LeftBar/LeftBar'

export default function AdminLayout({ children }) {
    return (
        <main className={`adminMain`}>
            <div className="admin-wrap">
                <div className="container">
                    <div className="fx fx-jb">
                        <LeftBar 
                            logoSrc="/admin/build-logo.svg"
                            logoWidth="62"
                            logoHeight="82"
                        />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}