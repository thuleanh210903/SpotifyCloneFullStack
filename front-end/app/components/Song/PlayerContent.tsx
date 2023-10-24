"use client";
import React, { useState } from "react";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BiSlider, BiVolume, BiVolumeFull } from "react-icons/bi";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import MediaItem from "./MediaItem";
import usePlayer from "@/app/hooks/usePlayer";
import Slider from "./Slider";
interface Song {
  id_song: number;
  song_name: string;
  lyric: string;
  image: string;
  id_category: number;
  id_artist: number;
  file_music: string;
}
interface PlayerContentProps {
  data: Song;
}
const PlayerContent: React.FC<PlayerContentProps> = ({ data }) => {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);


  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;


  //play previous song
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];
    console.log(previousSong)

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong)
  };

  //toggle 
  const toggleMute = () => {
    if (volume === 0) {
      // Unmute the audio
      setVolume(1);
    } else {
      // Mute the audio
      setVolume(0);
    }
  };
  return (
    <div className="grid grid-cols md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4 ml-5">
          <MediaItem data={data} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={() => {}}
          className="h-10 w-10 flex items-center justify-center rounded- bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div
        className="  hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6"
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400  cursor-pointer hover:text-white transition"
        />
        <div
          onClick={() => {}}
          className=" flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={() => {}}
          className="text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition"
          size={30}
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={30}
          />
          <Slider value={volume} onChange={(value)=>{setVolume(value)}} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
