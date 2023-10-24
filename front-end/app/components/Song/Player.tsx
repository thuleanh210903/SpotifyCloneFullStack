"use client";
import useGetSongById from "@/actions/useGetSongById";
// import useGetSongById from "@/actions/useGetSongById";
import usePlayer from "@/app/hooks/usePlayer";
import { useState, useEffect } from "react";
import PlayerContent from "./PlayerContent";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";

interface Song {
  id_song: number;
  song_name: string;
  image: string;
  id_category: number;
  lyric: string;
  id_artist: number;       
  file_music: string;
}

const Player: React.FC<Song> = ({ id_song }) => {
  const player = usePlayer();
  
  const [songUrl, setSongURL] = useState("");
  const { song } = useGetSongById(player.activeId);

  
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent data = {song} />
      {song?.file_music &&  
      <ReactAudioPlayer
      src={`http://localhost:8081/music_file/${song?.file_music}`}
      autoPlay
      controls
      /> } 
      
    </div>
  );
};

export default Player;
