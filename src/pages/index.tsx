import { useEffect, useState } from "react";
import Header from "../components/header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardContent } from "@/components/ui/card";
import Link from 'next/link';
type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  profile_path?: string;
  media_type: "movie" | "tv" | "person";
  genre_ids?: number[];
  vote_average?: number;
};

type Genre = {
  id: number;
  name: string;
};

type MovieWithTrailer = SearchResult & {
  trailerKey?: string | null;
};


interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
}
const ganres = [
  "Все",
  "Боевик",
  "Приключение",
  "Комедиа",
  "Фантастика",
  "Трилерры",
  "Драма",
];


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [actors, setActors] = useState<Actor[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [results, setResults] = useState<MovieWithTrailer[]>([]);
  const [apiUrl, setApiUrl] = useState("https://api.themoviedb.org/3/trending/movie/week?api_key=956055ece61ff6da16e896668e0403e2");
  const [selectedGanre, setSelectedGanre] = useState<string | null>(null);
  const API_KEY = '956055ece61ff6da16e896668e0403e2';
  const handleGanreClick = (ganre: string) => {
    setSelectedGanre(ganre);
  };
  const fetchGenres = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=956055ece61ff6da16e896668e0403e2&language=ru`
    );
    const data = await res.json();
    setGenres(data.genres);
  };

  console.log(ganres);

  
  useEffect(() => {
    const fetchData = async () => {
      const movieRes = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
      const genreRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru`);

      const movieData = await movieRes.json();
      const genreData = await genreRes.json();

      setMovies(movieData.results);
      setGenres(genreData.genres);
      setFilteredMovies(movieData.results);  
    };

    fetchData();
  }, []);

  const handleClick = (genre: string) => {
    setSelectedGenre(genre);

    if (genre === 'Все') {
      setFilteredMovies(movies);
    } else {
const genreId = genres.find((g: any) => g.name === genre)?.id;
      if (genreId) {
        const filtered = movies.filter((movie: any) => movie.genre_ids.includes(genreId));
        setFilteredMovies(filtered);
      }
    }
  };
  

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(
       apiUrl
      );
      const data = await res.json();

      const filtered = data.results.filter(
        (item: SearchResult) =>
          (item.poster_path || item.profile_path) && item.overview
      );

      const withTrailers: MovieWithTrailer[] = await Promise.all(
        filtered.map(async (item: SearchResult) => {
          try {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=956055ece61ff6da16e896668e0403e2`
            );
            const videoData = await res.json();
            const trailer = videoData.results.find(
              (v: any) => v.type === "Trailer" && v.site === "YouTube"
            );
            return {
              ...item,
              trailerKey: trailer?.key || null,
            };
          } catch (err) {
            return {
              ...item,
              trailerKey: null,
            };
          }
        })
      );

      setResults(withTrailers);
    };

    fetchTrending();
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const res = await fetch('https://api.themoviedb.org/3/person/popular?api_key=956055ece61ff6da16e896668e0403e2');
        const data = await res.json();
        setActors(data.results);
      } catch (error) {
        console.error('Ошибка при загрузке актёров:', error);
      }
    };

    fetchActors();
  }, []);


  const limitedItems = showAll ? filteredMovies : filteredMovies.slice(0, 8);

  const limitedTrailer = results.slice(0, 1);

  return (
    <>
  <section
  className="w-full"
  style={{
    backgroundImage: `linear-gradient(rgba(30, 37, 56, 0.84), rgb(30, 37, 56)), url('https://s3-alpha-sig.figma.com/img/7a18/8e13/0f7ceb74f39c8622dfb623220e93a372?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Y8maWieZUsF-EVo-TZtzArjAe5AVeAbk9VY4vxYe9mkBnTQXFZ8Gp2omhrqjfI09HL5FzqXb2KIHQB4fKk9z3rKILSSxnCJUAVOrRs21ODJVjeqGODRfXMb3mi2~Ll-JZp-IP5pEPixr-KKYtgtt1vpAktkPXeJ5BBIxO1ujJpNf1NCQzO82ZEoZE7PP2OdEeK3NM5YXsqW3YuUXNAbOW4G~VDLJ2uWoru458WCcjAgRs2b~CTpfnfjBt2ykFhX95D4Dut~QNSuD6~O2HlWCnU9wzQBX4J1KsZCFYDf0u-xbVVyWrGJ41sXHOezWpL0J7WA4PKS15t3UerC3bNt52Q__')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <Header />

  <div className="flex flex-col items-center text-center gap-6 pt-12 max-2xl:w-[100%]   ">
  <div className="flex flex-row flex-row gap-5 items-center justify-around w-full sm:flex-wrap 2xl:flex-row">
      <h1 className="text-white text-[32px] sm:text-[40px] lg:text-[60px] mr-[20px]">Сейчас в кино</h1>
      <div className="flex flex-wrap gap-5 justify-center w-full">
        {['Все', ...genres.slice(0, 5).map((genre: any) => genre.name)].map((genre, index) => (
          <h2
            key={index}
            className={`text-white px-2 py-2 rounded-xl hover:text-blue-600 transition cursor-pointer text-[16px] sm:text-[18px] lg:text-[20px] ${selectedGenre === genre ? 'text-blue-600' : ''}`}
            onClick={() => handleClick(genre)}
          >
            {genre}
          </h2>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-[95%] mx-auto 
  2xl:w-[85%] max-2xl:w-[100%]  
  justify-items-center items-center">
    {limitedItems.length > 0 ? (
  limitedItems.map((item) => (
    <Link key={item.id} href={`/movie/${item.id}`} className="block w-full">
      <div
        className="relative w-full h-[300px] sm:h-[350px] max-lg:w-[250px] lg:w-[302px] lg:h-[382px] flex flex-col items-start justify-start cursor-pointer hover:scale-[1.01] transition-all"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
          alt={item.title || item.name || "Image"}
          className="w-full h-full rounded mb-4"
          loading="lazy"
        />
        {item.vote_average !== undefined && (
          <div className="absolute top-2 left-2 text-white bg-blue-500 px-2 py-1 rounded-[5px] text-sm">
            {item.vote_average.toFixed(1)}
          </div>
        )}
        <p className="text-white font-semibold">{item.name}</p>
      </div>
    </Link>
  ))
) : (
  <p className="text-white">Загружаем данные...</p>
)}

    </div>

    {!showAll && results.length > 8 && (
      <button className="border w-[120px] h-[60px] text-white rounded-[10px] cursor-pointer hover:text-blue-500 hover:border-blue-500" onClick={() => setShowAll(true)}>
        Все новинки
      </button>
    )}

  </div>

  <div className="flex flex-col justify-center items-center pt-[20px]">
    <div className="flex w-full justify-between pl-[10%] pr-[10%] sm:pl-[5%] sm:pr-[5%]">
      <h1 className="text-[32px] sm:text-[40px] lg:text-[45px] text-white text-start">Новые Трейлеры</h1>
      <Link href={"/trailers"}>
        <p className="text-white px-2 py-2 rounded-xl hover:text-blue-600 transition flex items-center justify-center cursor-pointer text-[16px] sm:text-[18px] lg:text-[20px]">
          все трейлеры
        </p>
      </Link>
    </div>

    <div className="flex flex-col items-center gap-5 max-2xl:w-[90%]  ">
      {limitedTrailer.length > 0 && limitedTrailer[0].trailerKey ? (
        <div className="w-full flex justify-center mt-8  2xl:w-[85%]  max-2xl:w-[100%] ">
          <iframe
            width="95%"
            height="800px"
            src={`https://www.youtube.com/embed/${limitedTrailer[0].trailerKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-xl max-2xl:h-[500px]  max-sm:h-[300px]"
          ></iframe>
        </div>
      ) : (
        <p className="text-white mt-4">Трейлер не найден</p>
      )}

      <Carousel opts={{ align: "start" }} className="w-full max-w-[95%] 2xl:w-[80%]  max-2xl:w-[100%]">
        <CarouselContent>
          {results.map((item, index) => (
            <CarouselItem key={item.id || index} className="basis-[90%] sm:basis-[350px]">
              <div className="p-2">
                <div className="hover:scale-[1.03] transition-all cursor-pointer">
                  <CardContent className="flex flex-col p-0 items-start gap-2">
                    {item.trailerKey ? (
                      <iframe
                        width="10%"
                        height="60"
                        src={`https://www.youtube.com/embed/${item.trailerKey}`}
                        title={item.title || item.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-[10px] w-full h-[200px]"
                      ></iframe>
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
                        alt={item.title || item.name || "Image"}
                        className="w-full h-[200px] object-cover rounded-[10px]"
                      />
                    )}
                    <h2 className="text-white text-sm font-semibold text-center">
                      {item.title || item.name}
                    </h2>
                  </CardContent>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>

    <div className="flex flex-col justify-center items-center pt-[70px]   max-2xl:w-[90%]">
      <div className="w-full flex justify-between pb-[10px] pl-[10%] pr-[10%] sm:pl-[5%] sm:pr-[5%]">
        <h1 className="text-[30px] sm:text-[35px] lg:text-[40px] text-white text-start">Популярные Фильмы</h1>
        <p className="text-white px-2 py-2 rounded-xl hover:text-blue-600 transition flex items-center justify-center cursor-pointer">
          все фильмы
        </p>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full max-w-[95%] 2xl:w-[80%] max-2xl:w-[100%] ">
        <CarouselContent>
          {results.map((item, index) => (
            <CarouselItem key={item.id || index} className="basis-[90%] sm:basis-[350px]">
              <div className="p-2">
                <div className="hover:scale-[1.03] transition-all cursor-pointer">
                  <CardContent className="flex flex-col p-0 items-start gap-2">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
                      alt={item.title || item.name || "Image"}
                      className="w-full h-[400px] object-cover rounded-[10px]"
                    />
                    <h2 className="text-white text-sm font-semibold text-center">
                      {item.title || item.name}
                    </h2>
                  </CardContent>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>

    <div className="">
      <h1 className="text-white text-[32px] sm:text-[40px] lg:text-[45px] pb-[15px] pt-[25px]">Популярные персоны</h1>
      <div className="flex flex-col lg:flex-row gap-5 w-full ">
      <div className="flex gap-1">
      {actors.slice(0, 2).map((actor, index) => (
          <div
            key={actor.id}
            className="h-[300px] sm:h-[400px] lg:h-[400px] w-full sm:w-[400px] lg:w-[400px] shadow rounded-lg p-3 text-center text-white flex items-end"
            style={{
              backgroundImage: `
                linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 60%),
                url(https://image.tmdb.org/t/p/w300${actor.profile_path})
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex items-start flex-col ">
              <h1 className="text-white">{actor.name}</h1>
              <p className="text-[#F2F60F] text-[13px]">Популярность - {actor.popularity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#202437] rounded-xl p-6 max-lg:w-[600px]  sm:w-[1000px] max-w-md space-y-6 overflow-auto no-scrollbar h-[400px]">
      {actors.map((actor, index) => (
            <div className="border-b border-[#2e3248] pb-4" key={actor.id}>
              <div className="text-white text-lg font-semibold">{actor.name}</div>
              <div className="text-[#d5d541] text-sm mt-1">Популярность - {actor.popularity}</div>
              <div className="text-[#d5d541] text-sm mt-1">{index + 1} - место</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="relative bg-blue-900 text-white px-4 sm:px-10 py-10 rounded-xl shadow-lg w-[95%] lg:w-[80%] h-auto mx-auto overflow-hidden flex flex-col justify-center mt-[90px] mb-[40px]">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://s3-alpha-sig.figma.com/img/a3fe/19eb/772aa887e087df3d8b2db5a8b5c1fc28?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Q7LfHndxatfSYDr85~UpWxlkHE-J5jBG2AiOCcLg66Z6U1i6~tVjX6~nUBjqWqJdnJntkpCpz9tSTg47w6y5USqg9vlKEX~69O9kC4Wc2AZ8KrfW7V9d3p2qHX~58N9yHrp9rV3E5bmOpduIB2v~5bBBog2aQdqH9~uUoFtsg99~8rDTlWZK0Ptg73YFiS60dsH-HEFGpmcZc4fDb~nnZZxkjoUB7bwwJlhR5jP6Gvsw0l~57QHqF6~5~dcjwTF6EdtbAkCmMNV3xjRtO9cGsmhm10-7QgOpO0XtW5aRfNnOxqauY~2AxJ6Ucm2zyot2llrO8Dd~5BQ~g__')"}} />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl text-center font-bold mb-8">Подпишитесь на рассылку новостей</h2>
        <p className="text-lg sm:text-xl mb-8">Будьте в курсе всех последних новинок кино и сериалов!</p>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
          <input
            type="email"
            className="p-3 rounded-lg text-black w-full sm:w-72 border border-gray-300"
            placeholder="Введите свой E-mail адрес"
          />
          <button className="bg-yellow-400 text-black font-bold p-3 rounded-lg w-full sm:w-auto">Подписаться</button>
        </div>
      </div>
    </div>
  </div>
</section>

     
    </>
  );
}
