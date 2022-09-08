import { useState, useEffect, useCallback} from "react";

const Fetch = () => {

    const [dataNews, setDataNews] = useState('');
    const [search, setSearch] = useState('');
    const url1 = 'https://newsapi.org/v2/top-headlines?country=us';
    // const url2 = `https://newsapi.org/v2/everything?q=${search}`;

    const fetchNews = useCallback((url) => {
        fetch(url, {
            headers: {
                'X-Api-Key': 'dfb0aebf0cb64552b1a1da8efe1d6002'
            }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data['articles']);
                setDataNews(data['articles']);
            });
    }, []);

    useEffect(() => {
        fetchNews(url1);
    }, [fetchNews])
            
    return(
        <>
        <div className="container my-4 py-3 sticky-top" style={{ backgroundColor: '#E9FFEE' }}>
            <div className="row">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search news" aria-label="Search news" onChange={(e) => setSearch(e.target.value)}/>
                    <button className="btn btn-success" type="button">Search</button>
                </div>
            </div>
        </div>

        <div className="container mt-5">
            <div className="row gx-4 gy-5">

                {dataNews.map((item, i) => {
                    return <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <div className="card border-success mx-auto" key={i}>
                        <img src={item['urlToImage']} alt={item['title']} className="card-img-top"/>
                        <div className="card-body">
                            <h5>{item['title']}</h5>
                            <p className="fs-6">{new Date(item['publishedAt']).toLocaleDateString()} - {new Date(item['publishedAt']).toLocaleTimeString()}</p>
                            <p className="card-text">{item['description']}</p>
                            <a href={item['url']} className="btn btn-success">Read More</a>
                        </div>
                    </div>
                </div>
                })}

            </div>
        </div>
        </>
    )
}

export default Fetch;