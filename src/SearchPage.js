import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    books: [],
  }

  updateQuery = (query) => {
    if (!query) {
      this.setState(() => ({
        query: '',
        books: [],
      }))
    } else {
      this.setState(() => ({
        query: query
      }));

      BooksAPI.search(query)
        .then((books) => {
          if (books.error) {
            this.setState({ books: [] })
          } else {
            books.map((book) => (
              this.props.booksOnShelf.filter(b => b.id === book.id).map(b => book.shelf = b.shelf)
            ));
            this.setState({ books });
          }
        })
    }
  }

  render() {
    const { query, books } = this.state
    const { onMoveBook } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  onMoveBook={onMoveBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
