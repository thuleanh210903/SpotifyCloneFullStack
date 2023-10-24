import usePlayer from "@/app/hooks/usePlayer";
import React from "react";
import ArtistItem from "./ArtistItem";


interface Song {
  id_song: number;
  song_name: string;
  lyric: string;
  image: string;
  id_category: number;
  id_artist: number;
  file_music: string;
}
interface MediaItemProps {
  data: Song;
  onClick?: (id_song: number) => void;
}
const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const player = usePlayer();
  
    const handleClick = () => {
      if (onClick) {
        return onClick(data.id_song);
      }
      return player.setId(data.id_song);
    };
  
    return (
      <div
        onClick={handleClick}
        className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
      >
        <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <img
          src={`http://localhost:8081/images/${data?.image}`}
          alt="Song Image"
          className="object-cover w-14 pb-2 pr-1"
        />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{data?.song_name}</p>
          <ArtistItem id_artist={data?.id_artist} />
        </div>
      </div>
    );
  };
  
  export default MediaItem;
