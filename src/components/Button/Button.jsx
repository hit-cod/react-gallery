import s from './Button.module.css';

import { Component } from 'react';

class Button extends Component {
  handleClick = () => {
    this.props.onClick();
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  render() {
    return (
      <button type="button" className={s.Button} onClick={this.handleClick}>
        Load more
      </button>
    );
  }
}

export default Button;
