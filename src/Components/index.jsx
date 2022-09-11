import { useState, useEffect, useCallback } from "react";
import Navbar from "./Utils/Navbar";
import NewsCard from "./Utils/NewsCard";
import SearchBar from "./Utils/SearchBar";

const NewsSite = () => {
  const [dataNews, setDataNews] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState();

  //Fungsi untuk menyimpan input dari kolom pencarian
  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  //UseEffect untuk melakukan fetch data
  useEffect(() => {
    const url1 = "https://newsapi.org/v2/top-headlines?country=us";
    const url2 = `https://newsapi.org/v2/everything?q=${search}&searchIn=title`;

    const fetchNews = (url) => {
      setIsLoading(true);

      fetch(url, {
        headers: {
          "X-Api-Key": "dfb0aebf0cb64552b1a1da8efe1d6002",
        },
      })
        .then((response) => response.json())
        .then((data) => setDataNews(data["articles"]))
        .then(() => setIsLoading(false));
    };

    if (search.length === 0) {
      fetchNews(url1);
    } else if (search.length > 0) {
      fetchNews(url2);
    }
  }, [search]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Kolom Pencarian */}
      <SearchBar onChange={handleChange} />

      {/* Tampilan berita dalam bentuk kumpulan card */}
      <NewsCard dataNews={dataNews} isLoading={isLoading} />
    </>
  );
};

export default NewsSite;
