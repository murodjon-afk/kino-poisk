import Header from "../../components/header";
import { GetServerSideProps } from "next";
import Image from 'next/image';

type MovieData = {
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  trailerUrl: string | null;
  backdrop_path:string;
};
interface Video {
  type: string;
  id: string;
  key: string;
  name: string;
}


const Movie: React.FC<{ movieData: MovieData }> = ({ movieData }) => {
  return (
    <section
      className="w-full h-[100vh]"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 37, 56, 0.84), rgb(30, 37, 56)), url('https://image.tmdb.org/t/p/w500${movieData.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div className="flex flex-col  items-center justify-center ">
        <div className="p-4 rounded-lg flex items-center justify-center gap-5">
          <div className="">
            {movieData.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={movieData.title}
                width={400}
                height={559}
                className="rounded-lg mr-4"
              />
            )}
            <div className="flex gap-5 pt-[15px]">
              <button className="bg-[#1b2133] text-white w-[58px] h-[58px] cursor-pointer  rounded-[10px]"> ❤️</button>
              <button className="bg-[#1b2133] text-white w-[58px] h-[58px] cursor-pointer  rounded-[10px]"> 👍</button>
              <button className="bg-[#1b2133] text-white w-[58px] h-[58px] cursor-pointer  rounded-[10px]"> 👎</button>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <h2 className="text-xl font-bold text-[65px] text-white">{movieData.title}</h2>
            <div className="flex flex-col gap-2 w-[705px]">
              <p className="text-[20px] text-white">{movieData.overview}</p>
              <p className="mt-2 text-[20px] text-white w-[290px] h-[40px] flex items-center justify-center rounded-[10px] bg-green-500">
                Дата выпуска: {movieData.release_date}
              </p>
              <p className="text-[20px] text-white w-[150px] h-[40px] flex items-center justify-center rounded-[10px] bg-blue-500">
                Рейтинг: {movieData.vote_average}
              </p>
              <button className="w-[260px] rounded-[10px] border-[2px] h-[70px] border text-white cursor-pointer">
                Смотреть Трейлер
              </button>
            
            </div>
          </div>
        </div>
      </div>


      <div className="w-[100%] h-[100vh] bg-[#242a3d] flex flex-col items-center pt-[40px]">
        <h1 className="text-white text-[45px] pb-[10px]">Трейлер фильма </h1>
        <div className="w-[100%] ">
        {movieData.trailerUrl && (
  <div className="mt-4">
    <iframe
  width="100%"
  height="700"
  src={movieData.trailerUrl}
  title="Трейлер фильма"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="w-[100%] h-[500px] md:w-[70%] md:h-[450px] lg:w-[60%] lg:h-[700px] mx-auto mt-4"
/>

  </div>
)}

        </div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=956055ece61ff6da16e896668e0403e2`
  );
  const movieData = await movieRes.json();
  const videoRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=956055ece61ff6da16e896668e0403e2`
  );
  const videoData = await videoRes.json();
  const trailer = videoData.results.find((video: Video) => video.type === "Trailer");
  
  return {
    props: {
      movieData: {
        ...movieData,
        trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
      },
    },
  };
};

export default Movie;
