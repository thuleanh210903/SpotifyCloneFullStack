import React, { useEffect, useState } from 'react';

interface ArtistItemProps {
  id_artist: number;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ id_artist }) => {
  const [artistName, setArtistName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/artists/${id_artist}`);
        const data = await response.json();
        console.log(data);
        setArtistName(data.artist_name);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id_artist]);

  if (artistName === '') {
    return <div>Loading...</div>;
  }

  return <div>{artistName}</div>;
};

export default ArtistItem;