import s from './Button.module.css';

import { Component } from 'react';

class Button extends Component {
  handleClick = () => {
    this.props.onClick();
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
