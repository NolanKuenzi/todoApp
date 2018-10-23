import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class MyTodoApp extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        input: "",
        items: [],
        edit: false,
        originalLi: "",
        updateLi: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }
  
  handleInput(event) {
    if (event.target.value.length === 31) {
      this.setState({
        input: "",
        updateLi: ""
      }); 
      alert("Maximum Number of Characters Exceeded");
      return;
    }
    if (this.state.edit === true) {
      this.setState({
        updateLi: event.target.value
      });
      return;
    }
    if (this.state.edit === false) {
      this.setState({
        input: event.target.value
      });
      return;
    }
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const regEx = /\w/;
    if (!this.state.input.match(regEx)) {
      alert("Invalid Input");
      return;
    }
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.input === this.state.items[i]) {
        alert("Cannot Enter Same Task Twice");
        this.setState({
          input: ""
        });
        return;
      }
    }
    if (this.state.items.length > 9) {
      alert("Maximum Number of Tasks Exceeded");
      return;
    }
    this.setState({
      items: [...this.state.items, this.state.input],
      input: ""
    });
  }

  removeItem(event) {
    const remove = [...this.state.items];
    remove.splice(remove.indexOf(event.target.id), 1);
    this.setState({
      items: [...remove]
    });
  }

  editItem(event) {
    this.setState({
      edit: true,
      origLi: event.target.id,
      updateLi: event.target.id
    });
  }

  updateItem(event) {
    event.preventDefault();
    const newInfo = [...this.state.items];
    const updatedItem = this.state.items.indexOf(this.state.origLi);
    newInfo[updatedItem] = this.state.updateLi;
    
    this.setState({
      items: [...newInfo],
      edit: false,
      origLi: "",
      updateLi: ""
    }); 
  }

  closeEdit() {
    this.setState({
      edit: false
    });
  }

  render() {
    let list;
    if (this.state.edit !== true) {
      list = this.state.items.map(player => <li key={player}>{player}<button className="editButtons" id={player} onClick={this.editItem}>Edit</button><button className="deleteButtons" id={player} onClick={this.removeItem}>Delete</button></li>);
    } else if (this.state.edit === true) {
      list = this.state.items.map(player => <li key={player}>{player}<button className="editButtons" id={player} onClick={this.editItem}>Edit</button></li>);
    }
    let Update;
    if (this.state.edit === true) {
      Update = <form id="updateForm" onSubmit={this.updateItem}><input id="updateInput" value={this.state.updateLi} onChange={this.handleInput}></input><br /><div id="ubd"><button id="updateButton">Update</button></div><button id="closeButton">X</button></form>;
    } else {
        Update = null;
    }
    return (
      <div id="containerDiv">
        <h1>Todo App</h1>
          <ul id="itemsUl">{list}</ul>
            <form id="mainForm" onSubmit={this.handleSubmit}>
              <input id="mainInput" onChange={this.handleInput} value={this.state.input}></input> <br />
              <button id="addButton">Add</button>
            </form>
          {Update}
      </div>
    );
  }
}

ReactDOM.render(<MyTodoApp />, document.getElementById("root"));