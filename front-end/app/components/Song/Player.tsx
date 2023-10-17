"use client"
// import useGetSongById from "@/actions/useGetSongById";
import usePlayer from "@/app/hooks/usePlayer";
import { useState, useEffect } from "react";

interface Song {
  id_song: number;
  song_name: string;
  image: string;
  id_category: number;
  lyric: string;
  id_artist: number;
}

const Player:React.FC<Song> = ({id_song}) => {
 
  const player = usePlayer()
  console.log("hi"+player.activeId)

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
     
    </div>
  );
};

export default Player;