import React, { Component } from "react";
import shortid from "shortid";

class TodoForm extends Component{

  state = {
    text : ""
  };

  Change_handle(event)
  {
    this.setState({
      [event.target.name] : event.target.value
    });
  };

  formsubmitted(event)
  {
    event.preventDefault();
    //To prevent refresh
    this.props.onClick({
      id : shortid.generate(),
      text : this.state.text,
      completed : false
    });

    this.setState({
      text : ""
    });
  }


  render(){
    return (
      <form>
        <center>
          <input name="text" placeholder = "todo...." onChange = {this.Change_handle.bind(this)} value = {this.state.text} />
          <br />
          <br />
          <button onClick = {this.formsubmitted.bind(this)}>Submit</button>
        </center>
      </form>
    );
  }
}

export default TodoForm;
