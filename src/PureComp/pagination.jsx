import React,{Component} from 'react'
import BooksList from './BooksList'
import {Link} from 'react-router-dom'
import axios from 'axios'

const size=5

var arr=[]
class Pagination extends Component{
   
        constructor(props) {
          super(props);
      
            this.state = {
            books:this.props.books,
            skip:this.props.skip,
            currPage: this.props.currPage,
            totalPages:""
          }
          this.handleClick = this.handleClick.bind(this);
        }
        // skip = (this.state.currPage - 1) * size;
        async count(){
          
          const response=await axios.get('http://localhost:3000/api/booksData/count')
            if(response.status===200)
            { 
              let totalPages=Math.ceil((response.data.count)/size)
              console.log("//"+totalPages)
            }
            else 
            {
              console.log (response.status)
            }
          }
    
           async componentDidMount(){
            const response=await axios.get('http://localhost:3000/api/booksData/count')
            if(response.status===200)
            {
              this.setState({totalPages:Math.ceil((response.data.count)/size)})
              console.log("....."+this.state.totalPages)
            }
            else 
            {
              console.log (response.status)
            }
             
            for (let i=1;i<=this.state.totalPages;i++) {
              arr.push(i)
           }
          }
                              
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

        async handleClick(id,idx) {
          console.log(this.state.idx)
          const booksCopy=Array.from(this.state.books)
          const response=await axios.delete(`http://localhost:3000/api/booksData/${id}`)
          if (response.status === 200) {
              booksCopy.splice(idx, 1)
              this.setState({books: booksCopy})
      
        }
        else {alert (response.status)}
        }

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
      
          render(){
          return (
            <div className="display">
            <BooksList
                 books={this.state.books}
                handleClick={this.handleClick}
                handleChange={this.handleChange}
              />
              <ul className="Pagination">
            {
            arr.map(el=>{ return <li onClick={()=>{this.getPage(el)}}><Link to="/">{el}</Link></li>})
            }   
               
             </ul>
             </div>
          )
            }
          }
      

      export default Pagination
     

