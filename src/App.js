import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BooksList from './BooksList'
import './App.css'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState(() => ({
            books: books,
        }));
    });
}


  render() {
    return (
      <div className="app">
        
          <Route exact path='/search' render= {() => (
            <SearchBooks
            books = {this.state.books}     
            history = {this.props.history}
            />
          )} />
        
          <Route exact path='/' render= {() => (
            <BooksList books = {this.state.books} />
          )} />
        
      </div>
    )
  }
}

export default BooksApp
