import React, { Component } from "react";
import BookListElem from "./BookListElem";
import axios from 'axios'
import {Link} from 'react-router-dom'


const size=5

class BooksList extends Component {
  constructor(props) {
    super(props);
      this.state = {
      arr:[],
      books:this.props.books,
      totalPages:this.props.totalPages
    }
  }
  async componentDidMount(){
    console.log("%%"+this.state.books)
    const response=await axios.get('http://localhost:3000/api/booksData/count')
    if(response.status===200)
    {

      let arr2=[]
      let totalPages = Math.ceil((response.data.count)/size);
    for (let i=1;i<=totalPages;i++) {
    
      arr2.push(i)
      this.getPage()
   }
      this.setState({totalPages, arr:arr2})
      console.log("....."+this.state.totalPages)
    }
    else 
    {
      console.log (response.status)
    }
    
  }

  getPage(i=0){
    // console.log(i)
   if(i===0){i++}
   let skip = (i - 1) * size
       const res=axios.get("http://localhost:3000/api/booksData", {
  params: {
 filter:{
   "include": "BookAuth",
    "limit":size,
    "offset":skip,
 }}})
 .then(res=>{this.setState({books:res.data})
  console.log(this.state.books)
})
 .catch(err => alert(err)) 
}

  render() {
    return (
     <div>  
      <ul>
        {this.state.books.map((elem, key) => {
          return (
            <BookListElem
              title={elem.title}
              author={elem.author}
              price={elem.price}
              isbn={elem.isbn}
              key={key}
              id={elem.id}
              idx={key}
              image={elem.image}
               bookAuthor={elem.BookAuth}
              handleClick={this.props.handleClick}
              handleChange={this.props.handleChange}
            />
          );
        })
       }
      </ul>
      <ul className="Pagination">
            {
            this.state.arr.map(el=>{ return <li onClick={()=>{this.getPage(el);console.log(el)}}><Link to="/">{el}</Link></li>})
            }   
      </ul>
      </div>
    );
  }
}

export default BooksList;
