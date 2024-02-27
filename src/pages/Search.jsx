import { useState } from 'react';
import { useRef } from 'react';
import SearchForm from '../components/Form/SearchForm';
import SearchResults from '../components/Search/SearchResults';
import Section from '../components/ui/Layout/Section';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState(null);
  const inputEl = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchTerm(inputEl.current.value);
  };

  return (
    <>
      <Section>
        <SearchForm submitHandler={submitHandler} ref={inputEl} />
        <SearchResults searchTerm={searchTerm} />
      </Section>
    </>
  );
}

export default SearchPage;
