import s from './Searchbar.module.css';
import { Component } from 'react';

class Searchbar extends Component {
  state = {
    input: '',
  };

  handleInput = e => {
    this.setState({
        input: e.target.value
    })

  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.input)
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            onChange={this.handleInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
