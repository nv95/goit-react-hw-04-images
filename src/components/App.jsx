import { useState } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = searchQuery => {
    setQuery(searchQuery);
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery searchQuery={query} />
    </>
  );
};
