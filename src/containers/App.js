import React, { Component } from 'react';

import classes from './App.css';
import Person from '..components/Persons/Person/Person';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';


class App extends Component {
  state = {
    persons: [
      { id: 'asdasd', name: "Max", age: 28 },
      { id: 'gsdfg', name: "Manu", age: 29 },
      { id: 'xcvbtg', name: "Stephanie", age: 26 }
    ],
    otherState: 'some other state',
    showPersons: false
  };

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

    this.setState({ persons: persons });
  };

  //troca o estado da visibilidade
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    let persons = null;
    let btnClass = [classes.Button];

    if (this.state.showPersons) {
      persons = (
        < div >
          {
            //vamos mapear o array de javascript para uma representação em JSX
            //esta função anónima(pessoa) vai correr para cada um dos elementos do array
            this.state.persons.map((pessoa, indice) => {
              return <ErrorBoundary key={pessoa.id}>
                <Person
                  click={() => this.deletePersonHandler(indice)}
                  name={pessoa.name}
                  age={pessoa.age}

                  changed={(event) => this.nameChangedHandler(event, pessoa.id)} />
              </ErrorBoundary>
            })}
        </div>
      );

      btnClass.push(classes.Red)

    }

    //let classes = ['red', 'bold'].join(' ');//vai passar o array de strings para uma string separada com um espaço
    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);//classes = red
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);//classes = red & bold
    }



    //JSX(parece HTML mas é javascript)
    //converte tags html em elements REACT
    return (
      <div className={classes.App}>
        <h1>Bom dia</h1>
        <p className={assignedClasses.join(' ')} >This is really working</p>

        <button
          className={btnClass.join(' ')}
          onClick={this.togglePersonsHandler}>
          Switch name
        </button>
        {persons}


      </div>
    );
    //return React.createElement('div', {className: 'App' }, React.createElement('h1', null, 'Does this work now?'))

  }
}

export default App;
