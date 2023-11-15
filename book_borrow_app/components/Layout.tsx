import { ReactNode } from "react"
import classes from '../styles/layout.module.css';

type layoutType = {
    children: ReactNode
}
function Layout(props: layoutType) {
    return (
        <>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <h1>Book Share</h1>
                    <span>Borrow any book!</span>
                </div>
            </header>
            <main>
                {props.children}
            </main>
        </>
    )
}

export default Layout;