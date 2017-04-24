import React, { Component } from 'react';
import './App.css';

console.clear();
const Title = () => (
  <div>
    <div>
      <h1>To-Do</h1>
    </div>
  </div>
);

const TodoForm = ({addTodo}) => {
  let input;
  return(
    <div>
      <input type="text" ref={ node => {
        input = node;
      }}/>
      <button onClick={ () => {
        addTodo(input.value); 
        input.value = ''
        }}> + </button>
    </div>
  );
};

const Todo = ( {todo, remove} ) => {
  return <li onClick={() => {remove( todo.id )}}> {todo.text} </li>
}

const TodoList = ({todos, remove}) => {
  const todoNode = todos.map( (todo) => {
    return <Todo todo={todo} key={todo.id} remove={remove} />
  });
    return <ul>{todoNode}</ul>
}

// container component
//todo id
window.id = 0;
class TodoApp extends Component{
  constructor(){
    super();
    this.state = { data : [] }
  }

  addTodo(val){
    //assemble data 
    const todo = {text: val, id: window.id++}
    //update data
    this.state.data.push(todo);
    //update state 
    this.setState({ data:this.state.data });
  }

  handleRemove(id){
    const remainder = this.state.data.filter((todo)=>{
      if(todo.id !== id) return todo
    });
    this.setState({data: remainder})
  }

  render(){
    return(
      <div>
        <Title />
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList 
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}/>
      </div>
    )
  }
}




export default TodoApp;