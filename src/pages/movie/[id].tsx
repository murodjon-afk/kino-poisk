import Header from "../../components/header";
import { GetServerSideProps } from "next";
import Image from 'next/image';
import Footer from "@/components/footer";

type MovieData = {
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  trailerUrl: string | null;
  backdrop_path:string;
  cast:[];
  posters:[];
};


const Movie: React.FC<{ movieData: MovieData }> = ({ movieData }) => {
  return (
    <section
      className="w-full h-[100%] "
      style={{
        backgroundImage: `linear-gradient(rgba(30, 37, 56, 0.72), rgb(30, 37, 56)), url('https://image.tmdb.org/t/p/w500${movieData.backdrop_path}')`,
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

      <div style={{ padding: '20px' }} className="text-white w-[60%] overflow-auto mx-auto no-scrollbar" id="actors-movie">
    

    <h2 style={{ marginBottom: '20px' }} className="text-[40px]">В ролях:</h2>
    <div
     style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '20px',
      maxHeight: '400px',
      overflow: 'hidden',
      overflowY:'scroll'
    }}
    
    >
      {movieData.cast.map(
        (actor: { name: string; character: string; profile_path: string | null }, index: number) => (
          <div key={index} style={{ textAlign: 'center', width: '120px' }}>
           <Image
  src={
    actor.profile_path
      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
      : 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
  }
  alt={actor.name}
  width={120}
  height={180}
  style={{
    borderRadius: '10px',
    objectFit: 'cover',
    marginBottom: '10px',
  }}
/>
            <div style={{ fontWeight: 'bold' }}>{actor.name}</div>
            <div style={{ fontSize: '0.9rem', color: '#888' }}>{actor.character}</div>
          </div>
        )
      )}
    </div>
  </div>
    
      <div className=" flex flex-col items-center pt-[40px]"
      
     
      >
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


      <div className="flex items-center w-[100%] text-wgite justify-center flex-col py-[30px] gap-3 text-start pb-[100px] " id="poster-movie">
        <h1 className="text-[40px] text-white">Постеры Фильма</h1>
      <div className="flex overflow-auto gap-5 w-[63%]">
       {movieData.posters.map((poster: { file_path: string }, index: number) => (
        <Image
  key={index}
  src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
  alt={`Poster ${index + 1}`}
  width={300}
  height={450} 
  className="rounded-xl shadow-md"
/>
))}

       </div>
      </div>

      </div>

      <Footer></Footer>
      
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const apiKey = "956055ece61ff6da16e896668e0403e2";

  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
  const movieData = await movieRes.json();
  const videoRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
  );
  const videoData = await videoRes.json();
  const trailer = videoData.results.find(
    (video: { type: string; key: string }) => video.type === "Trailer"
  );


  const castRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
  );
  const castData = await castRes.json();


  const postersRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`
  );
  const postersData = await postersRes.json();
  const posters = postersData.posters || [];

  return {
    props: {
      movieData: {
        ...movieData,
        trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
        cast: castData.cast,
        posters, 
      },
    },
  };
};
export default Movie;
