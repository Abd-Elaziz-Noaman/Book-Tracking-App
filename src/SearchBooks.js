import React, {Component} from 'react'
import { withRouter } from "react-router-dom"; 
import * as BooksAPI from './BooksAPI';
import Book from './Book'



class SearchBooks extends Component {
    
    state = {
        query: '',
        searchBooks: []
    }

    updateQuery = (query) => {
        this.setState ( {
          query : query
        })
      
      BooksAPI.search(query)
        .then((searchBooks) => {
            if (!searchBooks || searchBooks.error) {
                this.setState({searchBooks: []});
                return;
            }
            searchBooks = Array.from(searchBooks).map((book) => {
                const bookOnShelf = this.props.books
                    .find(b => b.id === book.id);
                book.shelf = bookOnShelf
                    ? bookOnShelf.shelf
                    : "none";
                return book;
            });

            this.setState({searchBooks: searchBooks});
        })
    }

    shelfChange = (e) => {
        const newShelf= e.target.value;
        const id = e.target.id;
        BooksAPI.get(id).then((book) => BooksAPI.update(book, newShelf))
      }

    
    render() {
        const {query, searchBooks} = this.state
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    
                    <button className="close-search" onClick={() => this.props.history.push('/')}>Close</button>
                    
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchBooks && (Array.from(searchBooks)).map((book) => {
    
                                return <li key={book.id}>
                                    <Book book={book} ShelfChange={this.shelfChange}/>
                                </li>
                        })}
                    </ol>
                </div>

                
            </div>
        )
    }
}

const SearchPage = withRouter(SearchBooks);

export default SearchPage;