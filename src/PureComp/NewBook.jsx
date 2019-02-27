import React, { Component } from "react";
import axios from 'axios'

class NewBook extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      authorData:[]
    }
  }
  //onChange input tag
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      
    });
  };
  componentDidMount() {
    axios.get('http://localhost:3000/api/Authors')
   
          .then((response)=> {
            if(response.status===200){
            this.setState({authorData:response.data})
            }
            }
            )
          .catch((error)=> {
            console.log(error)
          })
  }
  handleSubmit = e => {
    e.preventDefault();

    const book = {
      title: this.state.title,
      author: this.state.author,
      isbn: this.state.isbn,
      price: this.state.price,
      description: this.state.description,
    
    };
    const id=document.getElementById('select').value
    console.log(id)
    this.props.onAddBook(book,id);
    window.location.reload();
  };

  handleChange = idx => {
    const selectedBook = this.state.books[idx];

    this.setState({
      idx: idx,
      title: selectedBook.title,
      author: selectedBook.a3uthor,
      price: selectedBook.price,
      isbn: selectedBook.isbn,
      description: selectedBook.description
    });
  };

  

  handleEdit = () => {
    const book = {
      title: this.state.title,
      author: this.state.author,
      isbn: this.state.isbn,
      price: this.state.price,
      description: this.state.description
    };

    const booksCopy = Array.from(this.state.books);
    // booksCopy[this.state.idx] = book;
    booksCopy.splice(this.state.idx, 1);
    booksCopy.splice(this.state.idx, 0, book);

    this.setState({ books: booksCopy });
  }
//onChange for select tag
 selectChange=(e)=>{
 const value=e.target.value;
 console.log(value)
 console.log(this.state.authorData)
  }

  render() {
    // let {title, isbn ,author ,price ,description} = this.state;
    // ()=>{this.props.add(title, isbn ,author ,price ,description)}
    return (
      <form onSubmit={this.handleSubmit}>
      <div className="form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="please enter the title"
            onChange={this.handleInputChange}
        //   value={this.state.title} 
          />
        </label>
        <br />
        <label>
          Author:
        <select id="select" onChange={this.selectChange}>
        {
          this.state.authorData.map(el=> <option value={el.id}>{el.name}</option>)
        }
          </select>
        </label>
        <br /> 
        <label>
          Price:
          <input
            type="number"
            name="price"
            placeholder="please enter the price"
            onChange={this.handleInputChange}
            // value={this.state.price}
          />
        </label>
        <br />
        <label>
          ISBN:
          <input
            type="number"
            name="isbn"
            placeholder="please enter the isbn"
            onChange={this.handleInputChange}
            // value={this.state.isbn}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            placeholder="please enter the description"
            name="description"
            onChange={this.handleInputChange}
            // value={this.state.description}
          />
        </label>
        <br />
        
        </div>
        <input type="submit" />
        <input type="button" value="edit" onClick={this.handleEdit} />
      </form>
    );
  }
}

export default NewBook;
