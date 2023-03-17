import styles from "../styles/Layout.module.css";
import Header from "./Header";

export default function Layout({ children, setPage,user }) {
  return <>
    <div className={`${styles.layout} container-fluid`}>

         <Header user={user}/>
        {children}
    </div>




  </>
}