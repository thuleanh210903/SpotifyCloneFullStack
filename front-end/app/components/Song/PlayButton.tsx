import usePlayer from "@/app/hooks/usePlayer"
import { data } from "autoprefixer"
import { FaPlay } from "react-icons/fa"

interface PlayButtonProps {
  id:number
}

const PlayButton:React.FC<PlayButtonProps> = ({id}) => {
  const player = usePlayer()
  const handlePlayButtonClick = () => {
  player.setId(id); // Truyền ID của bài hát
 
  };


  return (
   <button
   onClick={handlePlayButtonClick}
   className="transition 
   opacity-0 
   rounded-full 
   flex 
   items-center 
   justify-center 
   bg-green-500 
   p-4 
   drop-shadow-md 
   translate
   translate-y-1/4
   group-hover:opacity-100 
   group-hover:translate-y-0
   hover:scale-110"
   >
    <FaPlay className="text-black" />
   </button>
  )
}

export default PlayButton