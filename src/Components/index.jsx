import { useState, useEffect, useCallback } from "react";
import Navbar from "./Utils/Navbar";
import NewsCard from "./Utils/NewsCard";
import SearchBar from "./Utils/SearchBar";

const NewsSite = () => {
  const [dataNews, setDataNews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState();

  //Fungsi untuk menyimpan input dari kolom pencarian
  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    const url1 = "https://newsapi.org/v2/top-headlines?country=us";
    const url2 = `https://newsapi.org/v2/everything?q=${search}&searchIn=title`;
    let loadingTime;

    const fetchNews = (url) => {
      setLoading(false);

      //loadingTime digunakan untuk menampilkan animasi loading selama 100ms
      loadingTime = setTimeout(() => {
        setLoading(true);
      }, 100);

      //Melakukan fetch newsAPI
      fetch(url, {
        headers: {
          "X-Api-Key": "dfb0aebf0cb64552b1a1da8efe1d6002",
        },
      })
        .then((response) => response.json())
        .then((data) => setDataNews(data["articles"]));
    };

    //Mengubah url jika input dimasukkan
    if (search.length === 0) {
      fetchNews(url1);
    } else if (search.length > 0) {
      fetchNews(url2);
    }

    //Cleanup
    return () => {
      clearTimeout(loadingTime);
    };
  }, [search]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Kolom Pencarian */}
      <SearchBar onChange={handleChange} />

      {/* Tampilan berita dalam bentuk kumpulan card */}
      <NewsCard dataNews={dataNews} loading={loading} />
    </>
  );
};

export default NewsSite;
