import React, { Component } from "react";
import axios from "axios"

 class Author extends Component{
   constructor(props){
     super(props);
     this.state={
      Family_Name:"",
      name:"",
      Birth:"",
    
     }
   }

   handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      
    });
  };

   addAuthor =(author) =>{
    //e.preventDefault();
    
     axios.post("http://localhost:3000/api/Authors",author)
     .then(res=> res.data )
    .catch(err => alert(err)) 
 
  }
   submit = e => {
    e.preventDefault();

    const author = {
      Family_Name: this.state.Family_Name,
      name: this.state.name,
      Birth: this.state.Birth,
    }
    this.addAuthor(author);
    window.location.reload();
  }

    render(){
        return(
            <div className="fm">
            <form onSubmit={this.submit}>
            <label>
          Family Name:
          <input
            type="text"
            name="Family_Name"
            placeholder="please enter the family name of author"
            onChange={this.handleInputChange}
            //  value={this.state.Family_Name}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="please enter the name of author"
            onChange={this.handleInputChange}
            //  value={this.state.name}
          />
        </label>
        <br />
        {/* <label>
          Email:
          <input
            type="email"
            name="mail"
            placeholder="please enter the mail of author"
            onChange={this.handleInputChange}
             value={this.state.email}
          />
        </label>
        <br/> */}
        <label>
          Birth:
          <input
            type="date"
            name="Birth"
            placeholder="please enter the birth date"
            onChange={this.handleInputChange}
            // value={this.state.Birth}
          />
        </label>
        <br />
        <input type="submit" />
        <input type="button" value="edit" onClick={this.handleEdit} />
      </form>
            </div>
        )
    }
}
export default Author