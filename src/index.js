import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


class MyTodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    input: "" ,
    items: []
   }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  
  handleInput(event) {  
    this.setState ({
    input: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.input === "") {
      alert("Please enter a task");
      return;
    } 
    for (let j = 0; j < this.state.items.length; j++) {
      if (this.state.input === this.state.items[j]) {
        alert("Tasks cannot be duplicated");
        
        this.setState({
          input: ""
        });
        return;
      }
    }
    this.setState({
      items: [...this.state.items, this.state.input],
      input: ""
    });    
  }

  removeItem(event) {
    let remove = [...this.state.items];
    remove.splice(remove.indexOf(event.target.id), 1);
    this.setState({
      items: [...remove]
    });
  }
 
  render() {
   const list = this.state.items.map((ele) => <li key={ele}><button className="removeButtons" id={ele} onClick={this.removeItem}>X</button>{ele}</li>);   
    return  (
          <div className="containerDiv">
            <h1>Todo App</h1>
            <form className="inputs" onSubmit={this.handleSubmit}>
              <input onChange={this.handleInput} value={this.state.input}></input> <br />
              <button>Add</button>
            </form>
              <ul>{list}</ul>
          </div>
      );
   } 
}

ReactDOM.render(<MyTodoApp />, document.getElementById("root"));