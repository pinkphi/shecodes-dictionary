import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loading, setLoading] = useState(false);
  let [photos, setPhotos] = useState(null);

  const handlePexelsResponse = useCallback((response) => {
    setPhotos(response.data.photos);
    setLoading(false);
  }, [])

  const handleDictionResponse = useCallback((response) => {
    setResults(response.data[0]);

    let pexelsApiKey = "563492ad6f91700001000001920c3b8770e74cfa9e6a9efa97b67713";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    let headers = { Authorization: `Bearer ${pexelsApiKey}` };

    axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
  }, [handlePexelsResponse, keyword])


  const search = useCallback(function() {
   
    // documentation: https://dictionaryapi.dev/e
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(handleDictionResponse);
  }, [handleDictionResponse, keyword]);

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  useEffect(() =>  {
    search();
  }, [search]);

  return loading ? (
    <>
      Loading...
    </>
  ) : (
    <div className="Dictionary">
      <section>
        <h1>What word do you want to look up?</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            onChange={handleKeywordChange}
            defaultValue={props.defaultKeyword}
          />
        </form>
        <div className="hint">suggested words: sunset, yoga, plant..</div>
      </section>
      <Results results={results} />
      <Photos photos={photos} />
    </div>
  );
}
