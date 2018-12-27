import React from "react";
console.log(window.localStorage.lsArray);
let localStorageArr;
const setLocalStorage = (function() {
  if (JSON.parse(window.localStorage.getItem("lsArray")) === null) {
    localStorageArr = [];
  }
  else {
    localStorageArr = JSON.parse(window.localStorage.getItem("lsArray"));
  }
})();
class MyTodoApp extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        input: "",
        items: [...localStorageArr],
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
    if (this.state.items.length === 9) {
      alert("Maximum Number of Tasks Exceeded");
      return;
    }
    const newInputArr = [...this.state.items, this.state.input];
    window.localStorage.setItem("lsArray", JSON.stringify(newInputArr));
    this.setState({
      items: [...newInputArr],
      input: ""
    });
  }
  removeItem(event) {
    const remove = [...this.state.items];
    remove.splice(remove.indexOf(event.target.id), 1);
    window.localStorage.setItem("lsArray", JSON.stringify(remove));
    this.setState({
      items: [...remove]
    });
  }
  editItem(event) {
    this.setState({
      edit: true,
      originalLi: event.target.id,
      updateLi: event.target.id
    });
  }
  updateItem(event) {
    const newInfo = [...this.state.items];
    const updatedItem = this.state.items.indexOf(this.state.originalLi);
    newInfo[updatedItem] = this.state.updateLi;
    window.localStorage.setItem("lsArray", JSON.stringify(newInfo));
    this.setState({
      items: [...newInfo],
      edit: false,
      originalLi: "",
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
      list = this.state.items.map(item => <li key={item}>{item}<button className="editButtons" id={item} onClick={this.editItem}>Edit</button><button className="deleteButtons" id={item} onClick={this.removeItem}>Delete</button></li>);
    } else if (this.state.edit === true) {
      list = this.state.items.map(item => <li key={item}>{item}<button className="editButtons" id={item} onClick={this.editItem}>Edit</button></li>);
    }
    let Update;
    if (this.state.edit === true) {
      Update = <form id="updateForm">
                 <div><input id="updateInput" value={this.state.updateLi} onChange={this.handleInput}></input></div><br />
                 <div id="ubd"><button id="updateButton" onClick={this.updateItem}>Update</button></div><div><button id="closeButton" onClick={this.closeEdit}>X</button></div>
              </form>;
    } else {
        Update = null;
    }
    return (
      <div id="containerDiv">
        <h1>Todo App</h1>
          <ul id="itemsUl">{list}</ul>
            <form id="mainForm">
              <input id="mainInput" onChange={this.handleInput} value={this.state.input}></input> <br />
              <button id="addButton" onClick={this.handleSubmit}>Add</button>
            </form>
          {Update}
      </div>
    );
  }
} 
export { MyTodoApp };
