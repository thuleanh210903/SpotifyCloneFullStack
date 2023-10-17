"use client";
import { Link } from "@prisma/client/runtime/library";
import Image from "next/image";
import PlayButton from "./PlayButton";
import ArtistItem from "./ArtistItem";
import usePlayer from "@/app/hooks/usePlayer";
interface Song {
  id_song: number;
  song_name: string;
  lyric: string;
  image: string;
  id_category: number;
  id_artist: number;
}

interface SongItemProps {
  data: Song;
  onClick?: (id: number) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {

  return (
    <div
    
      className="relative 
    group 
    flex 
    flex-col 
    items-center 
    justify-center 
    rounded-md 
    overflow-hidden 
    gap-x-4 
    bg-neutral-400/5 
    cursor-pointer 
    hover:bg-neutral-400/10 
    transition 
    p-3"
    >
      <div
        className="  relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden"
      >
        <img
          src={`http://localhost:8081/images/${data.image}`}
          alt="Song Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.song_name}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By{" "}
          <span>
            <ArtistItem id_artist={data.id_artist} />
          </span>
        </p>
      </div>
      <div
        className="  absolute 
          bottom-24 
          right-5"
      >
        <PlayButton id={data.id_song}/>
      </div>
    </div>
  );
};

export default SongItem;
