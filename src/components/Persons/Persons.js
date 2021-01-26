import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');

        if (nextProps.persons !== this.props.persons) {
            return true;
        } else if (nextProps.isAuthenticated) {
            return true;
        } else {
            return false;
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Snapshot' };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        console.log('[Persons.js] rendering...');
        return this.props.persons.map((pessoa, indice) => {
            return (
                <Person
                    click={() => this.props.clicked(indice)}
                    name={pessoa.name}
                    age={pessoa.age}
                    key={pessoa.id}
                    changed={(event) => this.props.changed(event, pessoa.id)}
                />
            );
        });
    }
}

export default Persons;