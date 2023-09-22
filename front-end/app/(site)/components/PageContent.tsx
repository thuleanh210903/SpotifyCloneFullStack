"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongItem from '@/app/components/Song/SongItem';
import { Link } from '@prisma/client/runtime/library';

interface Song {
  id_song: number;
  song_name: string;
  image:  Link; // Update the type of the 'image' property
  id_category: number;
  lyric: string;
}

const PageContent = () => {
 
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/songs');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs: ', error);
      }
    };

    fetchData();
  }, []);

  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        No songs available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem key={song.id_song} data={song} />
      ))}
    </div>
  );
};

export default PageContent;