import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'asdasd', name: "Max", age: 28 },
      { id: 'gsdfg', name: "Manu", age: 29 },
      { id: 'xcvbtg', name: "Stephanie", age: 26 }
    ],
    otherState: 'some other state',
    showPersons: false,
    showCockpit: true,
    counter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps ', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndice) => {
    //const pessoas = this.state.persons.slice();//slice, copia o array, assim nao estamos a mexer diretamente no original
    //também posso fazer uma cópia da seguinte forma. Que segue o ES6 (Spread operator)
    const persons = [...this.state.persons]

    persons.splice(personIndice, 1);//remove 1 elemento do array
    this.setState({ persons: persons });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });


    //spread operator
    const pessoa = {//assim copio o conteudo e nao a referencia! já que o javascript ñ funciona como o c++
      ...this.state.persons[personIndex]
    };

    pessoa.name = event.target.value;
    const persons = [...this.state.persons]
    persons[personIndex] = pessoa;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        counter: prevState.counter + 1
      };
    });
  };

  //troca o estado da visibilidade
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }



    //JSX(parece HTML mas é javascript)
    //converte tags html em elements REACT
    return (
      <WithClass classes={classes.App}>
        <button
          onClick={() => {
            this.setState({ showCockpit: false })
          }}>
          Remove Cockpit
        </button>

        <AuthContext.Provider value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }}>
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />) : null
          }
          {persons}
        </AuthContext.Provider>
      </WithClass >
    );
    //return React.createElement('div', {className: 'App' }, React.createElement('h1', null, 'Does this work now?'))

  }
}

export default App;
