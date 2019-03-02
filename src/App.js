import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./App.css";
import BooksList from "./PureComp/BooksList";
import NewBook from "./PureComp/NewBook";
import Author from "./PureComp/NewAuthor";
import BooksAuthor from "./PureComp/booksAuthor";
import Pagination from './PureComp/pagination'
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import axios from "axios";

const size=5


class App extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      books: [],
      idx: "",
      title: "",
      author: "",
      price: "",
      isbn: "",
      description: "",
      id:"",
      // BookAuth:""
      skip:"",
      currPage:1,
      totalPages:""
    };
    
    // this.handleClick = this.handleClick.bind(this);
    this.add=this.add.bind(this)
    console.log("***"+this.state.skip+"***")
  }
  
  
  
  async componentDidMount() {
     
    const response = await axios.get("http://localhost:3000/api/booksData", {
      params: {
        filter:{
          "include": "BookAuth",
            "limit":size,
            "offset":this.state.skip,
        }
      }
    });
    
    //  console.log(response.data)
    if (response.status === 200) {
      const books = [];
      response.data.map(prop => {
        const book = {
          title: prop.title,
          author: prop.author,
          isbn: prop.isbn,
          price: prop.price,
          description: prop.description,
          id: prop.id,
          BookAuth: prop.BookAuth
        };
        books.push(book);
      });

     this.setState({ books: books });
    } else {
      // handle error
      console.log(response.status);
    }
    
    try{

    }catch(e){

    }
  }


    add =(book,id) =>{
      //e.preventDefault();
      // console.log(book)
       axios.post(`http://localhost:3000/api/Authors/${id}/booksData`,book)
      .then(res=> res.data )
      .catch(err => alert(err)) 
    }
  // async handleClick(id,idx) {
  //   console.log(this.state.idx)
  //   const booksCopy=Array.from(this.state.books)
  //   const response=await axios.delete(`http://localhost:3000/api/booksData/${id}`)
  //   if (response.status === 200) {
  //       booksCopy.splice(idx, 1)
  //       this.setState({books: booksCopy})

  // }
  // else {alert (response.status)}
  // }

  // setCurrentPage=(num)=>{
  //   this.setState({
  //      currPage:num,
  //      skip :(this.state.currPage - 1) * size
  //   }, ()=>
  //   {console.log("%%%%%"+this.state.skip)
  // }
  //   )
  //   }
  
  getPage(i){
    console.log(i)
   let skip = (i - 1) * size
       axios.get("http://localhost:3000/api/booksData", {
  params: {
 filter:{
   "include": "BookAuth",
    "limit":size,
    "offset":skip,
 }}})
 .then(res=> { this.setState({books:res.data})
 console.log(this.state.books)})
 .catch(err => alert(err)) 
}

  render(){
    return (
      <div className="App">
             <Router>
          <div>
            <ul className="list-style">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/addBook">New Book</Link>
              </li>
              <li>
                <Link to="/addAuthor">New Author</Link>
              </li>
            </ul>
          <Switch>
            <Route exact path="/">
              <BooksList
                books={this.state.books}
                handleClick={this.handleClick}
                handleChange={this.handleChange}
              />  
            </Route>
            <Route  path="/addAuthor" component={Author}></Route>
            <Route  path="/addBook">
              <NewBook onAddBook={this.add}/>
            </Route>
            <Route path="/BooksAuthor/:id" component={BooksAuthor}/>
            {/* <BooksAuthor booAuth={this.state.books}/> */}
            {/* </Route> */}
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
