import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  function onSearch() {
    apiGet(`/search/shows?q=${input}`).then(result => {
      setResults(result);
    });
  }

  function onInputChange(ev) {
    setInput(ev.target.value);
  }

  function onKeyDown(ev) {
    if (ev.keyCode === 13) {
      onSearch();
    }
  }

  function renderResults() {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }

    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }

    return null;
  }

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
}

export default Home;
