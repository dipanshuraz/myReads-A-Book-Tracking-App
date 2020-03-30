import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired,
  }

  handleChangeShelf = (e) => {
    if (this.props.onMoveBook) {
      this.props.onMoveBook(this.props.book, e.target.value)
    }
  }

  render() {
    const { book } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`
            }}
          >
          </div>
          <div className="book-shelf-changer">
            <select value={book.shelf ? book.shelf : 'none'} onChange={this.handleChangeShelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book
