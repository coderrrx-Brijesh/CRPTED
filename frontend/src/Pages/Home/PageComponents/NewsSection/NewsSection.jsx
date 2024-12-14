import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'crypto',
            from: '2024-11-14',
            sortBy: 'publishedAt',
            language: 'en',
            apiKey: '733bec34464d4f05912d6f7246841045',
            pageSize: 6,
          },
        });

        setNewsData(response.data.articles);
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container max-w-full px-10 py-10  text-white">
      <h1 className="text-center text-4xl font-bold my-4 pb-5 text-gray-100">Latest Crypto News</h1>

      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsData.map((news, index) => (
            <div
              key={index}
              className="bg-black rounded-lg shadow-lg overflow-hidden transition-transform duration-500 transform hover:-translate-y-2 border border-gray-700"
            >
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                <div className="h-48 w-full overflow-hidden m-auto">
                  <img
                    src={news.urlToImage || '/default-image.jpg'}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-100">{news.title}</h2>
                  <p className="text-sm font-extralight text-gray-400 mt-2">{news.description}</p>
                  <p className="text-xs text-gray-500 mt-4">Source: {news.source.name}</p>
                  <p className="text-xs  text-gray-400">Published: {new Date(news.publishedAt).toLocaleString()}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
