import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

    const toggleButtonRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');

        //setTimeout(() => {
        //    alert('Saved data to cloud');
        //}, 1000);
        toggleButtonRef.current.click();

        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };

        //}, [props.persons]);//este effect só executa quando o persons é alterado
    }, []);//este effect só executa no inicio(similar ao componentDidMount das classes)

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });

    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = classes.Red
    }


    //let classes = ['red', 'bold'].join(' ');//vai passar o array de strings para uma string separada com um espaço

    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);//classes = red
    }
    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold);//classes = red & bold
    }



    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')} >This is really working</p>

            <button
                ref={toggleButtonRef}
                className={btnClass}
                onClick={props.clicked}>
                Switch name
            </button>
            <button onClick={authContext.login}>Log In</button>
        </div>
    );
};

export default React.memo(cockpit);