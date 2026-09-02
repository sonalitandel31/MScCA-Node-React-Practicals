import { useEffect, useState } from "react";

function MusicStore() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  return (
    <div className="container">
      <h1>🎵 Music Store</h1>

      {songs.map((song) => (
        <div className="card" key={song.id}>
          <h2>{song.title}</h2>
          <p>Artist : {song.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default MusicStore;