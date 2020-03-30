import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  state = {
    booksOnShelf: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((booksOnShelf) => {
        this.setState({booksOnShelf})
      })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        this.setState((currentState) => ({
          booksOnShelf: currentState.booksOnShelf.filter(b => b.id !== book.id).concat([book])
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <MainPage
              booksOnShelf={this.state.booksOnShelf}
              onMoveBook={this.moveBook}
            />
        )} />
        <Route path='/search' render={() => (
            <SearchPage
              booksOnShelf={this.state.booksOnShelf}
              onMoveBook={this.moveBook}
            />
        )} />
      </div>
    )
  }
}

export default BooksApp
