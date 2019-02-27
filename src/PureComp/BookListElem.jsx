import React, { Component } from "react";
import {  Link } from "react-router-dom";
import axios from "axios"


const size=5
class BookListElem extends Component {
  constructor(props){
 super (props);
 this.state={
   bookAuthData:[]
 }

  } 
  componentDidMount() {
   
    axios.get('http://localhost:3000/api/booksData',{
      params: {
        filter:{
          "include": "BookAuth",
         
        }
      }
    }
    )
   
   
          .then((response)=> {
            if(response.status===200){
              this.setState({bookAuthData:response.data})
              // console.log(this.state.bookAuthData)
              
            }
            }
            )
          .catch((error)=> {
            console.log(error)
          })
  }

  render() {
    return (
      <div className="bookContent"> 
      <li>
       
        {this.props.idx} | {this.props.title} |<Link to={`/BooksAuthor/${this.props.bookAuthor.id}`}>{this.props.bookAuthor && this.props.bookAuthor.name}</Link> |
        {this.props.price}$ |{this.props.isbn}|{""}
       
        <button
          onClick={() => {
            this.props.handleClick(this.props.id,this.props.idx);console.log(this.props.idx)
            console.log(this.props.bookAuthor.name)
          }}
        >
          X
        </button>
        <button
          onClick={() => {
            this.props.handleChange(this.props.idx);
          }}
        >
          (--!--)
        </button>
      </li>
      </div>
    );
  }
}

export default BookListElem;
