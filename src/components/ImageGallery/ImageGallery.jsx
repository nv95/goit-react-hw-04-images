import galleryAPI from '../../services/pixabayApi';
import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from 'components/ImageGalleryList/ImageGalleryList';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export const ImageGallery = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idRe');
  const [error, setError] = useState(null);
  const [opened, setOpenedImage] = useState(null);
  const [total, setTotalHits] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus('pending');
        setPage(1);
        const { hits, totalHits } = await galleryAPI.getImages(searchQuery);
        if (hits.length > 0) {
          setImages(hits);
          setStatus('resolved');
          setPage(2);
          setTotalHits(totalHits);
        } else {
          throw new Error(`Query: ${searchQuery}`);
        }
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    };
    if (searchQuery) {
      fetchData();
    }
    return () => {};
  }, [searchQuery]);

  const onLoadMore = () => {
    galleryAPI
      .getImages(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length > 0) {
          setImages(prevImages => [...prevImages, ...hits]);
          setPage(prevPage => prevPage + 1);
        } else {
          throw new Error(` Query: ${searchQuery}`);
        }
      })
      .catch(error => {
        setError(error.message);
        setStatus('rejected');
      });
  };

  const handleOpenPicture = (src, tags) => {
    const openedImage = {
      src,
      tags,
    };
    setOpenedImage(openedImage);
  };

  const handleClosePicture = e => {
    if (e.target.nodeName === 'DIV' || e.code === 'Escape') {
      setOpenedImage(null);
    }
  };
  if (status === 'idRe') return null;
  if (status === 'pending') return <Loader />;
  if (status === 'rejected') return Notify.failure(error);
  if (status === 'resolved') {
    return (
      <>
        <ImageGalleryList>
          <ImageGalleryItem images={images} onClick={handleOpenPicture} />
        </ImageGalleryList>
        {images.length < total ? (
          <Button onClick={onLoadMore} />
        ) : (
          Notify.info(`Last matches with query: ${searchQuery}`)
        )}
        {opened && <Modal openedImage={opened} onClick={handleClosePicture} />}
      </>
    );
  }
};
