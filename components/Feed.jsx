'use client'

import { useState, useEffect } from 'react';

import PromptCardList from '@components/PromptCardList';




const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data);
  };

  const filterPosts = (searchText) => {

    const filteredPosts = new RegExp(searchText, 'i');
    const results = allPosts.filter((post) => filteredPosts.test(post.tag) ||
      filteredPosts.test(post.creator.username) ||
      filteredPosts.test(post.prompt));
    return results;
  }


  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPosts(searchText);
        setSearchedResults(searchResults);
      }, 500)
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResults = filterPosts(tag);
    setSearchedResults(searchResults);
  }

  useEffect(() => {
    fetchPosts();
  }, []);



  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username!'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (<PromptCardList
        data={searchedResults}
        handleTagClick={handleTagClick}
      />) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
        />
      )}

    </section>
  )
}

export default Feed