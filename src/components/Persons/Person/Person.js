import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Aux from '../../../hoc/Auxiliary';
import AuthContext from '../../../context/auth-context';


class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;//Permite a esta classe ter acesso ao AuthContext. O react faz o trabalho todo por trás para tornar isto possível

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }


    render() {
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}

                <p key="i1" onClick={this.props.click} > I'm {this.props.name} and I'm {this.props.age} years old!!</p>
                <p key="i2"> {this.props.children}</p >
                <input
                    key="i3"
                    ref={this.inputElementRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        )
    };
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default Person;