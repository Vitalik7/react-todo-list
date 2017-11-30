import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      elements: [],
      text: '',
      mode: 'all'
    }

    this.addElement = this.addElement.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.removeElement = this.removeElement.bind(this)
    this.checkboxChange = this.checkboxChange.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.inputEmpty = this.inputEmpty.bind(this)
  }

  addElement(event) {
    event.preventDefault()
    this.setState({
      text: '',
      elements: this.state.elements.concat([{
        title: this.state.text,
        checked: false
      }])
    })
  }

  inputChange(e) {
   this.setState({text: e.target.value})
  }

  titleChange(e, ind) {
    this.state.elements[ind].title = e.target.value
    this.setState({
      elements: this.state.elements
    })
  }

  removeElement(index) {
    this.state.elements.splice(index, 1)
    this.setState({
      elements: this.state.elements
    })
  }

  checkboxChange(index){
    this.state.elements[index].checked = !this.state.elements[index].checked
    this.setState({
      elements: this.state.elements
    })
  }

  changeMode(newMode) {
    this.setState({
      mode: newMode
    })
  }

  inputEmpty(){
    if (this.state.text == '') {
      alert('Write text!!')
      return
    }
  }

  render() {
    return (
      <div >
        <form onSubmit={this.addElement} >
          <input
            type='text'
            placeholder='Write text'
            value={this.state.text}
            onChange={this.inputChange}
          />

          <button type='submit' onClick={this.inputEmpty}>
            Add
          </button>
        </form>
        <ul>
          {this.state.elements.map((element, index) => {
            if (this.state.mode === 'checked' && !element.checked) {
              return
            } else if (this.state.mode === 'unchecked' && element.checked) {
              return
            }

            return (
              <li key={index} >
                <input
                  type='checkbox'
                  checked={element.checked}
                  onChange={() => this.checkboxChange(index)}
                />
                <input
                  type='text'
                  style={{
                    textDecoration: element.checked ? 'line-through' : 'none',
                    color: element.checked ? 'gray' : 'black'
                  }}
                  value={element.title}
                  onChange={event => this.titleChange(event, index)}
                />
                <button onClick={() => this.removeElement(index)} style={{color: 'red'}} > X </button>
              </li>
            )
          }
        )}
        </ul>
        <button onClick={() => {this.changeMode('all')}}>All</button>
        <button onClick={() => {this.changeMode('checked')}}>Checked</button>
        <button onClick={() => {this.changeMode('unchecked')}}>Unchecked</button>
      </div>
    );
  }
}

export default App;
