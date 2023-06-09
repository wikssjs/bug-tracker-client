import styles from '../styles/ProjectPopup.module.css'
import { useEffect, useState, useRef } from 'react';

export default function ProjectPopup({ setShowPopup, setNotification, setAddProject }) {

    const [name, setName] = useState('');
    const [errorName , setErrorName] = useState(false);



    const [description, setDescription] = useState('');
    const [errorDescription , setErrorDescription] = useState(false);

    const [contributors, setContributors] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [chekedBoxes, setChekedBoxes] = useState([]);
    const popupRef = useRef(null);
    const [headers, setHeaders] = useState({});





    useEffect(() => {

        const token = localStorage.getItem('token');
        setHeaders({
            'Content-Type': 'application/json',
            'Authorization': `ksklkweiowekdl908w03iladkl ${token}`
        });

        fetch('https://james-bug-api.herokuapp.com/users', {headers: headers})
            .then(res => res.json())
            .then(data => setContributors(data.users))
    }, [])

    useEffect(() => {
        // Add event listener to the document object
        document.addEventListener('mousedown', handleClickOutside);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Event handler to check if the click occurred outside of the popup
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };

    function handleCheck(event) {
        if (!event.currentTarget.classList.contains('checked')) {
            setChekedBoxes(chekedBoxes.filter(box => box !== Number(event.currentTarget.dataset.id)));
        }
        else {
            setChekedBoxes([...chekedBoxes, Number(event.currentTarget.dataset.id)]);
        }
    }

    function closePopup() {
        setShowPopup(false);
    }

    function handleNameChange(event) {
        const name = event.target.value;
        setName(name);
        setErrorName(name ? "" : "Project Name is required");
    }

    function handleDescriptionChange(event) {
        const description = event.target.value;
        setDescription(description);
        setErrorDescription(description ? "" : "Description is required");
    }

    async function handleSumit(event) {
        if (event) {

            event.preventDefault();
        }

        if (!name) {
            setErrorName("Project Name is required");
          }
        
          if (!description) {
            setErrorDescription("Description is required");
            return;
          }

        let data = {
            name: name,
            description: description,
            contributors: chekedBoxes
        }

        //post request
        let response = await fetch('https://james-bug-api.herokuapp.com/add-project', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })


        if (response.ok) {
            setNotification({ show: true, name: name, message: 'has been created' });
            setShowPopup(false);
        }
        else {
        }

    }



    return (<>

        <div ref={popupRef} className={`${styles.popup} popup shadow-lg row rounded-3`}>
            <button onClick={closePopup} className='btn'><i class="bi bi-x-circle-fill abosolute"></i></button>
            <form noValidate className='d-flex flex-column' onSubmit={handleSumit}>
                <h1>Add a new Project</h1>
                <label htmlFor="">
                    <input className='form-control' type="text" placeholder='Project' required onChange={handleNameChange} />
                    {
                        errorName && <span className='text-danger'>Project Name is required</span>
                    }
                </label>


                <label htmlFor="">
                    <textarea name="" id="" cols="30" rows="10" placeholder='Description' required onChange={handleDescriptionChange}></textarea>
                    {
                        errorDescription && <span className='text-danger'>Description is required</span>
                    }
                </label>

                <div className={styles.users}>
                    <div class="select-btn open">
                        <span class="btn-text">Select Users</span>
                        <span class="arrow-dwn">
                            <i class="fa-solid fa-chevron-down"></i>
                        </span>
                    </div>

                    <ul className={`${styles.listes_users} list-items overflow-scroll open`}>

                        {
                            contributors.map((contributor) => {

                                return (
                                    <li key={contributor.id} data-id={contributor.id} onClick={(event) => { event.currentTarget.classList.toggle("checked"); event.currentTarget.classList.contains("checked" ? handleCheck(event) : "") }} className={`item `}>
                                        <span class="checkbox">
                                            <i class="bi bi-check-lg check-icon"></i>
                                        </span>
                                        <span class="item-text">{contributor.username}</span>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
                <input id='primary' className='w-50 btn btn-success mt-3' type="submit" value="Add" />

            </form>
        </div>

    </>

    )
}

