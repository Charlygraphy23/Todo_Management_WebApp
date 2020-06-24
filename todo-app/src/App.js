import React, { Component } from 'react';
import './App.css';
// import TodoAppComponent from './component/todo-app/TodoAppComponent.jsx'
import TodoAppComponent from './component/todo/TodoApp.jsx'

class App extends Component{
  render(){
  return (
    <div className="App">
      {/* <TodoAppComponent/> */}
      <TodoAppComponent/>
    </div>
  )
  };
}

export default App;
