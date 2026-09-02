import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "./newsActions";

function News() {
    const dispatch = useDispatch();

    const { news, loading, error } = useSelector(
        (state) => state
    );

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>News Application</h1>

            {loading && (
                <p className="loading">
                    Loading news...
                </p>
            )}

            {error && (
                <p className="error">
                    Error: {error}
                </p>
            )}

            {!loading && !error && (
                <div className="list">
                    {news.map((article) => (
                        <div className="card" key={article.id}>
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default News;