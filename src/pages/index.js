import React, { useState, useEffect } from 'react';
import articlesData from '../data/articles.json';

export default function Home() {
  // Sort articles by date, from newer to older
  articlesData.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  // Filtering and updating the articles based on search term and selected filters
  useEffect(() => {
    const filterArticles = () => {
      const filtered = articlesData.articles.filter((article) => {
        const articleContent = article.content.toLowerCase();
        const articleTitle = article.title.toLowerCase();
        const articleTheme = article.theme;
        const matchesSearchTerm =
          articleContent.includes(searchTerm.toLowerCase()) ||
          articleTitle.includes(searchTerm.toLowerCase());
        const matchesFilters =
          selectedFilters.length === 0 ||
          selectedFilters.includes(articleTheme);
        return matchesSearchTerm && matchesFilters;
      });
      setFilteredArticles(filtered);
    };

    filterArticles();
  }, [searchTerm, selectedFilters]);

  // Event handler for search input change
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Toggle filter selection
  const toggleFilter = (theme) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(theme)) {
        return prevFilters.filter((filter) => filter !== theme);
      } else {
        return [...prevFilters, theme];
      }
    });
  };

  // Get unique themes from articles
  const themes = Array.from(
    new Set(articlesData.articles.map((article) => article.theme))
  );

  // JavaScript code for the slider functionality
  useEffect(() => {
    const filterSlider = document.getElementById('filterSlider');
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let animationId = null;
  
    const startAutoSlider = () => {
      const speed = 1; // Adjust the sliding speed (higher value means faster)
  
      const animate = () => {
        scrollLeft += speed;
        filterSlider.scrollLeft = scrollLeft % filterSlider.scrollWidth;
        animationId = requestAnimationFrame(animate);
      };
  
      animationId = requestAnimationFrame(animate);
    };
  
    const stopAutoSlider = () => {
      cancelAnimationFrame(animationId);
    };
  
    const startManualSlider = (e) => {
      isMouseDown = true;
      startX = e.pageX - filterSlider.offsetLeft;
      scrollLeft = filterSlider.scrollLeft;
      stopAutoSlider();
    };
  
    const handleSliderMouseUp = () => {
      if (isMouseDown) {
        isMouseDown = false;
        startAutoSlider();
      }
    };
  
    const handleSliderMouseMove = (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - filterSlider.offsetLeft;
      const walk = (x - startX) * 3; // Adjust the sliding speed
      scrollLeft -= walk;
    };
  
    const handleSliderClick = () => {
      if (!isMouseDown) {
        stopAutoSlider();
      }
    };
  
    filterSlider.addEventListener('mousedown', startManualSlider);
    filterSlider.addEventListener('mouseup', handleSliderMouseUp);
    filterSlider.addEventListener('mouseleave', handleSliderMouseUp);
    filterSlider.addEventListener('mousemove', handleSliderMouseMove);
    filterSlider.addEventListener('click', handleSliderClick);
  
    startAutoSlider();
  
    return () => {
      filterSlider.removeEventListener('mousedown', startManualSlider);
      filterSlider.removeEventListener('mouseup', handleSliderMouseUp);
      filterSlider.removeEventListener('mouseleave', handleSliderMouseUp);
      filterSlider.removeEventListener('mousemove', handleSliderMouseMove);
      filterSlider.removeEventListener('click', handleSliderClick);
      stopAutoSlider();
    };
  }, []);

  // JSX rendering
  return (
    <div className='container mx-auto py-10'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>Confsistemas Blog</h1>
        <p>A gateway to improve your knowledge</p>
        <div className='text-center mb-8 mt-8 flex flex-wrap justify-center space-x-2'>
          {/* Render filter buttons based on themes */}
          <div id='filterSlider' className='filter-slider'>
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => toggleFilter(theme)}
                className={`px-4 py-2 m-2 rounded-md font-medium focus:outline-none ${
                  selectedFilters.includes(theme)
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-700 text-white'
                    : 'bg-gradient-to-r from-gray-800 to-gray-400 text-white'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
        <div className='mt-8 mb-3 flex justify-center'>
          <input
            type='text'
            placeholder='Search articles'
            value={searchTerm}
            onChange={handleSearchInputChange}
            className='w-80 sm:w-96 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-300'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {/* Render filtered articles */}
        {filteredArticles.map((article) => (
          <div key={article.id} className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-bold mb-2'>{article.title}</h2>
            <p className='text-gray-600 mb-4'>{article.content}</p>
            <p className='text-gray-500 text-sm'>
              <span className='font-bold'>Author:</span> {article.author}
            </p>
            <p className='text-gray-500 text-sm'>
              <span className='font-bold'>Date:</span> {article.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
