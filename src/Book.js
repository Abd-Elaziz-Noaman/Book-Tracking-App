import React, {Component} from 'react'

class Book extends Component {
    render() {
        const {book} = this.props
    
        return (
            <div className="book">
                <div className="book-top">

                    {book.imageLinks && 
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    }

                    <div className="book-shelf-changer">
                        <select defaultValue="move" onChange={this.props.ShelfChange} id={book.id} value = {book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>

                </div>
                    <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(',') : 'Authors are unknown'}</div>
            </div>
        )
    }
}

export default Book;