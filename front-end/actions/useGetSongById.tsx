import { useEffect, useState } from "react"
import axios from "axios";
interface Song {
    id_song: number;
    song_name: string;
    image:  string; 
    id_category: number;
    lyric: string;
    id_artist: number;
    file_music:string
  }


  const useGetSongById = (id_song: number | undefined): { song: Song } => {
    const [song, setSong] = useState<Song | undefined>();
  
    useEffect(() => {
      const fetchData = async () => {
        if (id_song === undefined) {
          return; // Do not make the API call if id_song is undefined
        }
  
        try {
          const response = await axios.get(`http://localhost:8081/songs/${id_song}`);
          setSong(response.data);
        } catch (error) {
          console.error('Error fetching songs: ', error);
        }
      };
  
      fetchData();
    }, [id_song]);
  
    return { song: song! };
  };
  export default useGetSongById
