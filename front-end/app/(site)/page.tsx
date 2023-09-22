
import Image from "next/image";
import ListItem from "../components/ListSong/ListItem";
import Header from "../components/Header";
import getSong from "@/actions/getSong";
import PageContent from "./components/PageContent";
export default async function Home() {

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image="/images/liked.png" name="Liked Song" href="liked"/>
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
           <h1 className="text-white text-2xl font-semibold">
            Newest Songs
           </h1>
        </div>
        <div className="">
          <PageContent />
        </div>
      </div>
    </div>
  );
}
