"use client"
import { Link } from "@prisma/client/runtime/library";
import PlayButton from "./PlayButton";
interface Song {
  id_song: number;
  song_name: string;
  lyric: string;
  image: Link;
  id_category: number;
}

interface SongItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  console.log(data)
  return (
    <div onClick={()=>{}}
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
      <div className="  relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden">

      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
    
        <p className="font-semibold truncate w-full">{data.song_name}</p>
        <p className="text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate">By {data.id_category}</p>
      </div>
      <div className="  absolute 
          bottom-24 
          right-5">
            <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;