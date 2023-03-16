import Link from 'next/link';
import { useEffect,useState} from 'react';
import styles from '../styles/Sidebar.module.css'


export default function Sidebar() {
    const headers = {
        'Content-Type': 'application/json',
        'X-API-Key': `ksklkweiowekdl908w03iladkl`
    };
    
      const[user, setUser] = useState({});

      useEffect (() => {
      
        }, [])

        function fetchData(){
            fetch('https://james-bug-api.herokuapp.com/user', { headers: headers })
            .then(res => res.json())
            .then(data =>console.log(data))
        }
            


    const handleLogout = async (event) => {


        event.preventDefault();
        try {
        let response = await fetch('https://james-bug-api.herokuapp.com/user/logout', 
          {method: 'POST', 
          headers: headers 
        });
          if(response.ok){
              alert("You are disconnected");
              window.location.href = "/connexion";
          }
        } catch (error) {
          console.error(error);
        }

      };


    return (
        <div className={`${styles.sidebar} col-sm-2 bg- text-center`}>
            <h5 className='text-warning mt-3'>In Development ...{user ? user.id :"caca"}</h5>
            <p></p>
            <h3 onClick={fetchData} className="text-white mt-4 mb-4">Bug Tracker</h3>
            <ul className={`${styles.nav_menu} d-flex flex-column gap-5 text-start`}>
                <li><Link href="/" className="text-white"><i className='bi bi-laptop'></i> DashBoard</Link></li>
                <li><Link href="/tickets" className="text-white"> <i className='bi bi-ticket'></i> Tickets</Link></li>
                {
                    user && user.role === 'admin' ? <li><Link href="/admin" className="text-white"> <i className='bi bi-person-badge-fill'></i> Administration</Link></li> : null
                }
                {
                    !user && (
                        <li><Link href="/connexion" className="text-white"> <i className='bi bi-person-badge-fill'></i> Connexion</Link></li>
                        )
                }
              {

                user && (
                <li>
                    <form
                        onSubmit={handleLogout}>
                        <button className={`${styles.logOut} btn btn-danger`}
                            type='submit'><i class="bi bi-box-arrow-right"></i> 
                            LogOut
                        </button>
                    </form>
                </li>
                )
                }       
            </ul>
        </div>
    );
}