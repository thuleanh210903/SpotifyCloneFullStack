import { useEffect, useState } from "react"
import axios from "axios";
interface Song {
    id_song: number;
    song_name: string;
    image:  string; 
    id_category: number;
    lyric: string;
    id_artist: number;
  }


const useGetSongById = (id_song: number): { song: Song } => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8081/songs/${id_song}`);
        setSong(response.data);
      } catch (error) {
        console.error('Error fetching songs: ', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id_song]);

  return { song, isLoading };
};

export default useGetSongById;