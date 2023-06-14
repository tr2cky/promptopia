'use client'

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};


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
        handleTagClick={() => { }}
      />) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={() => { }}
        />
      )}

    </section>
  )
}

export default Feed