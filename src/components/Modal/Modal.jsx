import s from './Modal.module.css';
import { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClick, false);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClick, false);
  }

  handleClick = e => {
    const { onClick } = this.props

    if (e.currentTarget === e.target) {
      onClick();
    }

    if (e.code === 'Escape') {
      onClick();
    }
  };

  render() {
    const { lgImg, altOfImage } = this.props;

    return (
      <div className={s.Overlay} onClick={this.handleClick} tabIndex="0">
        <div className={s.Modal}>
          <img src={lgImg} alt={altOfImage} />
        </div>
      </div>
    );
  }
}

export default Modal;
