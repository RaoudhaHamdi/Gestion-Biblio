import React, { Component } from "react";
import {  Link } from "react-router-dom";
import axios from "axios"


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
    } )
           .then((response)=> {
            if(response.status===200){
              this.setState({bookAuthData:response.data})
              // console.log(this.state.bookAuthData)
              
            }
            }
            )
          .catch((error)=>{
            console.log(error)
          })
  }

  render(){
    return (
      <div className="bookContent"> 
      <li>
       <ul className="BookDisplayStyle row"> 
        {/* <li>Book Index:{this.props.idx}</li> */}
        <div c1assName="col-lg-4 col-md-4">
         <li>{this.props.title}</li>
        <li><Link to={`/BooksAuthor/${this.props.bookAuthor.id}`}>{this.props.bookAuthor && this.props.bookAuthor.name}</Link></li>
         <li>{this.props.price}$</li> 
         {/* <li>{this.props.isbn}{""}</li> */}
       
       </div>
       </ul>
        <button
          onClick={() => {
            this.props.handleClick(this.props.id,this.props.idx);console.log(this.props.idx)
            console.log(this.props.bookAuthor.name)
          }}
        >
          X
        </button>
      </li>
      </div>
    );
  }
}

export default BookListElem;
