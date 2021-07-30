import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI' 

class BooksList extends Component {

  state = {
    shelfName: {
      title_1: 'Currently Reading',
      title_2: 'Want to Read',
      title_3: 'Read'
    },
    books: null
  }

  componentDidMount () {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books,
      }))
    })
  }

  updateShelf = (book, shelf) => {
    this.setState(state => ({
      books: state
        .books
        .filter(b => b.id !== book.id)
        .concat([book])
    }))
    BooksAPI.update(book, shelf)
  }

  shelfChange = (e) => {
    const newShelf= e.target.value;
    const id = e.target.id;
    let myBook = this.state.books.map((book) => 
      book.id === id
    )
    .indexOf(true)
    let updatedBook = this.state.books[myBook]
    updatedBook['shelf'] = newShelf
    this.updateShelf(updatedBook, newShelf)
  }
    render() {
      const {books} = this.state
      if (!books) {
        return <div>Loading</div>
      }
        return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title"> {this.state.shelfName.title_1} </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.map((book) => {
                        if (book.shelf === "currentlyReading") {
                          return <li key={book.id}>
                          <Book book={book} ShelfChange={this.shelfChange}/>
                          </li>
                        }
                      })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title"> {this.state.shelfName.title_2} </h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">
                      {books.map((book) => {
                        if (book.shelf === "wantToRead") {
                          return <li key={book.id}>
                          <Book book={book} ShelfChange={this.shelfChange}/>
                          </li>
                        }
                      })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title"> {this.state.shelfName.title_3} </h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">
                      {books.map((book) => {
                        if (book.shelf === "read") {
                          return <li key={book.id}>
                          <Book book={book} ShelfChange={this.shelfChange}/>
                          </li>
                        }
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <Link 
            className="open-search"
            to='/search'>
              <button>Add a book</button>
            </Link>
        </div>
        )
    }
}

export default BooksList;