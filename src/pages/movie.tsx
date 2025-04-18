import React, { useState } from 'react';
import Header from "../components/header";
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  vote_count: string;
}

interface MoviePostersProps {
  movies: Movie[];
}

const MoviePosters: React.FC<MoviePostersProps> = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        className="w-[100%] h-[100%]"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 37, 56, 0.84), rgb(30, 37, 56)), url('https://s3-alpha-sig.figma.com/img/7a18/8e13/0f7ceb74f39c8622dfb623220e93a372?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Y8maWieZUsF-EVo-TZtzArjAe5AVeAbk9VY4vxYe9mkBnTQXFZ8Gp2omhrqjfI09HL5FzqXb2KIHQB4fKk9z3rKILSSxnCJUAVOrRs21ODJVjeqGODRfXMb3mi2~Ll-JZp-IP5pEPixr-KKYtgtt1vpAktkPXeJ5BBIxO1ujJpNf1NCQzO82ZEoZE7PP2OdEeK3NM5YXsqW3YuUXNAbOW4G~VDLJ2uWoru458WCcjAgRs2b~CTpfnfjBt2ykFhX95D4Dut~QNSuD6~O2HlWCnU9wzQBX4J1KsZCFYDf0u-xbVVyWrGJ41sXHOezWpL0J7WA4PKS15t3UerC3bNt52Q__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Header />
        <div className="pt-[20px]">
          <div className="flex gap-10 items-center justify-start">
            <h1 className="text-white text-[45px] pl-[40px] pt-[30px]">Все новинки кино</h1>

            <input
              type="search"
              placeholder="Поиск по названию фильма..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-[40px] mt-[30px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="relative rounded-lg overflow-hidden">
                <div className="p-4">
                  {movie.poster_path && (
                    <div className="mt-2">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={500}  
                        height={750} 
                        className="rounded-md"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <h3 className="text-black text-lg font-bold pt-1 text-white">{movie.title}</h3>

                  <div className="absolute top-7 left-4 text-white bg-blue-500 px-2 py-1 rounded-[5px] text-sm">
                    <span>{movie.vote_average}</span>
                  </div>
                  <div className="absolute top-7 left-24 text-white bg-green-500 px-2 py-1 rounded-[5px] text-sm">
                    <span>{movie.vote_count} votes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const response = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=956055ece61ff6da16e896668e0403e2');
  const data = await response.json();

  return {
    props: {
      movies: data.results,
    },
  };
}

export default MoviePosters;
