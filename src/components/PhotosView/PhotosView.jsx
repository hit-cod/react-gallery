import { Component } from 'react';
import Loader from 'react-loader-spinner';

import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar';
import Button from '../Button/Button';
import Modal from '../Modal';

class PhotosView extends Component {
  state = {
    query: '',
    photos: [],
    page: 1,
    largeImg: null,
    altOfImage: null,
    error: null,
    isOverlayVisible: false,
    isLoading: false,
  };

  componentDidUpdate(prevPr, PrevSt) {
    if (PrevSt.query !== this.state.query) {      
      this.fetchPhotos();
    }
  }

  handleSummit = input => {
    this.setState({
      query: input,
      photos: [],
      page: 1,
    });
  };

  handlePhotoClick = e => {
    this.setState(prevSt => ({
      ...prevSt,
      largeImg: e.target.dataset.lgimage,
      altOfImage: e.target.alt,
      isOverlayVisible: true,
    }));
  };

  handleOverlayClose = () => {
    this.setState(prevSt => ({
      ...prevSt,
      isOverlayVisible: false,
    }));
  };

  fetchPhotos = () => {
    this.setState(prevSt => ({
      ...prevSt,
      isLoading: true,
    }));

    // setTimeout(() => {
    fetch(
      `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=20663127-62d3229d929679f587996a550&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
        this.setState(({ photos, page }) => ({
          photos: [...photos, ...hits],
          page: page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(
        this.setState(prevSt => ({
          ...prevSt,
          isLoading: false,
        })),
      );
    // .finally(() => this.setState({ isLoading: false }));
    // }, 500);
  };

  render() {
    const {
      photos,
      isLoading,
      error,
      largeImg,
      altOfImage,
      isOverlayVisible,
    } = this.state;
    const shouldRenderLoadMoreButton = photos.length > 0 && !isLoading;

    return (
      <>
        {error && <h1>Something went wrong. Please, try later.</h1>}

        <Searchbar onSubmit={this.handleSummit} />

        {photos.length > 0 && (
          <ImageGallery photos={photos} onClick={this.handlePhotoClick} />
        )}

        {isLoading && (
          <Loader
            type="MutatingDots"
            color="#4169e1"
            height={100}
            width={100}
            style={{ textAlign: 'center' }}
          />
        )}

        {shouldRenderLoadMoreButton && <Button onClick={this.fetchPhotos} />}

        {isOverlayVisible && (
          <Modal
            onClick={this.handleOverlayClose}
            lgImg={largeImg}
            altOfImage={altOfImage}
          />
        )}
      </>
    );
  }
}

export default PhotosView;
