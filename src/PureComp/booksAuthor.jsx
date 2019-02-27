import React, { Component } from "react";
import axios from "axios"

class BooksAuthor extends Component {
  constructor(props){
    super(props);
    this.state={
      bookAuth:[],
      authorId:""
    }
    
  }
  

  componentDidMount=()=>{
    let id=this.state.authorId
    id=this.props.match.params.id
    axios.get(
      'http://localhost:3000/api/Authors/'+id+'/booksData',
      {
        params: {
          filter:{
            "limit": "5"
            // "fields":"title"
          }
        }
      }
      )
      
          .then((response)=> {
            if(response.status===200){
            
            this.setState({bookAuth:response.data})            
            }
            }
            )
          .catch((error)=> {
            console.log(error)
          })
       }
  
  
    render() {
      return (
          <div className="listBooks">
            <ul>
           {this.state.bookAuth.map(el=> 
            <li><span>Title:</span> {el.title}|
             <span>Price:</span>{el.price}DT
             </li>)
           }
           </ul>
          </div>
      )
    }
}
export default BooksAuthor