import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://content.guardianapis.com/search",
          {
            params: {
              q: "cryptocurrency OR bitcoin OR ethereum OR blockchain",
              "api-key": "642bb37f-fd72-4a7a-98fc-cbc0608a43ec",
              "show-fields": "headline,trailText,thumbnail,lastModified,byline",
              "show-tags": "contributor",
              "page-size": 9,
              "order-by": "newest",
            },
          }
        );

        setNewsData(response.data.response.results);
        setUsingMockData(false);
      } catch (err) {
        console.error("Guardian API fetch error:", err);
        setError("Failed to fetch news from The Guardian API");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="news-container max-w-full px-10 py-10 text-white">
      <h1 className="text-center text-4xl font-bold my-4 pb-5 text-gray-100">
        Latest Crypto News
      </h1>

      {usingMockData && (
        <div className="text-center text-yellow-500 text-sm mb-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : error && !usingMockData ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsData.map((news, index) => (
            <div
              key={index}
              className="bg-black rounded-lg shadow-lg overflow-hidden transition-transform duration-500 transform hover:-translate-y-2 border border-gray-700"
            >
              <a href={news.webUrl} target="_blank" rel="noopener noreferrer">
                <div className="h-48 w-full overflow-hidden m-auto">
                  <img
                    src={news.fields?.thumbnail || "/default-image.jpg"}
                    alt={news.fields?.headline}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-100">
                    {news.fields?.headline || news.webTitle}
                  </h2>
                  <p className="text-sm font-extralight text-gray-400 mt-2">
                    {news.fields?.trailText || news.webTitle}
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
                    Section: {news.sectionName}
                  </p>
                  <p className="text-xs text-gray-400">
                    Published: {formatDate(news.webPublicationDate)}
                  </p>
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
