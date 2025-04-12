import { GetServerSideProps } from 'next';
import Header from "../components/header";
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { useState } from 'react';

type MediaType = "movie" | "tv" | "person";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  profile_path?: string | null;
  media_type: MediaType;
  genre_ids?: number[];
  vote_average?: number;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieWithTrailer extends SearchResult {
  trailerKey?: string | null;
}

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
}

interface HomeProps {
  movies: SearchResult[];
  genres: Genre[];
  actors: Actor[];
  results: MovieWithTrailer[];
}

const API_KEY = '956055ece61ff6da16e896668e0403e2';

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const [movieRes, genreRes, actorRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`),
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru`),
      fetch(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`)
    ]);

    if (!movieRes.ok || !genreRes.ok || !actorRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const [movieData, genreData, actorData] = await Promise.all([
      movieRes.json(),
      genreRes.json(),
      actorRes.json()
    ]);

    const withTrailers: MovieWithTrailer[] = await Promise.all(
      movieData.results.map(async (item: SearchResult) => {
        try {
          const videoRes = await fetch(
            `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${API_KEY}`
          );
          if (!videoRes.ok) throw new Error('Video fetch failed');
          
          const videoData = await videoRes.json();
          const trailer = videoData.results.find(
            (v: Video) => v.type === "Trailer" && v.site === "YouTube"
          );
          return {
            ...item,
            trailerKey: trailer?.key || null,
          };
        } catch (error) {
          console.error(`Failed to fetch trailer for movie ${item.id}:`, error);
          return {
            ...item,
            trailerKey: null,
          };
        }
      })
    );

    return {
      props: {
        movies: movieData.results || [],
        genres: genreData.genres || [],
        actors: actorData.results || [],
        results: withTrailers || [],
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        movies: [],
        genres: [],
        actors: [],
        results: [],
      },
    };
  }
};

const Home: React.FC<HomeProps> = ({ movies, genres, actors, results }) => {
  const [filteredMovies, setFilteredMovies] = useState<SearchResult[]>(movies);
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [showAll, setShowAll] = useState(false);

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    if (genre === 'Все') {
      setFilteredMovies(movies);
    } else {
      const genreId = genres.find((g) => g.name === genre)?.id;
      if (genreId) {
        const filtered = movies.filter((movie) => 
          movie.genre_ids?.includes(genreId)
        );
        setFilteredMovies(filtered);
      }
    }
  };

  const limitedItems = showAll ? filteredMovies : filteredMovies.slice(0, 8);
  const mainTrailer = results[0]?.trailerKey ? results[0] : null;

  return (
    <section
      className="w-full min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 37, 56, 0.84), rgb(30, 37, 56)), url('https://s3-alpha-sig.figma.com/img/7a18/8e13/0f7ceb74f39c8622dfb623220e93a372?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Y8maWieZUsF-EVo-TZtzArjAe5AVeAbk9VY4vxYe9mkBnTQXFZ8Gp2omhrqjfI09HL5FzqXb2KIHQB4fKk9z3rKILSSxnCJUAVOrRs21ODJVjeqGODRfXMb3mi2~Ll-JZp-IP5pEPixr-KKYtgtt1vpAktkPXeJ5BBIxO1ujJpNf1NCQzO82ZEoZE7PP2OdEeK3NM5YXsqW3YuUXNAbOW4G~VDLJ2uWoru458WCcjAgRs2b~CTpfnfjBt2ykFhX95D4Dut~QNSuD6~O2HlWCnU9wzQBX4J1KsZCFYDf0u-xbVVyWrGJ41sXHOezWpL0J7WA4PKS15t3UerC3bNt52Q__')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">Сейчас в кино</h1>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Все', ...genres.slice(0, 5).map((genre) => genre.name)].map((genre) => (
              <button
                key={genre}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedGenre === genre 
                    ? ' text-white' 
                    : ' text-white hover:bg-gray-700'
                }`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {limitedItems.map((item) => (
            <Link 
              key={item.id} 
              href={`/${item.media_type}/${item.id}`}
              className="group relative overflow-hidden rounded-lg  transition-transform hover:scale-105"
              passHref
            >
              <div className="aspect-[2/3] relative">
                <Image
                  src={
                    item.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : '/placeholder-movie.jpg'
                  }
                  alt={item.title || item.name || 'Media'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
                {item.vote_average && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                    {item.vote_average.toFixed(1)}
                  </div>
                )}
              </div>
              <div className="p-4 ">
                <h3 className="text-white font-semibold truncate">
                  {item.title || item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {!showAll && movies.length > 8 && (
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowAll(true)}
            >
              Показать все
            </button>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-3xl md:text-4xl font-bold">Новые Трейлеры</h2>
          <Link href="/trailers" className="text-white hover:text-blue-400 transition-colors">
            Все трейлеры →
          </Link>
        </div>

        {mainTrailer ? (
          <div className="mb-12">
            <div className="aspect-video w-full relative rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${mainTrailer.trailerKey}`}
                className="w-full h-full"
                title="Main Trailer"
                allowFullScreen
              />
            </div>
            <h3 className="text-white text-xl mt-4">
              {mainTrailer.title || mainTrailer.name}
            </h3>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white text-lg">Трейлеры не найдены</p>
          </div>
        )}

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {results.slice(0, 10).map((item) => (
              <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <Link href={`/movie/${item.id}`} className="group cursor-pointer" passHref>
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    {item.trailerKey ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${item.trailerKey}`}
                        className="w-full h-full"
                        title={item.title || item.name || 'Trailer'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <Image
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : '/placeholder-movie.jpg'
                        }
                        alt={item.title || item.name || 'Media'}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-white mt-2 group-hover:text-blue-400 transition-colors truncate">
                    {item.title || item.name}
                  </h3>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>


      <div className="pt-16 sm:pt-20 mx-auto w-full sm:w-[90%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%]">
  <div className="text-center pb-4 sm:pb-6 px-6 sm:px-10 md:px-14">
    <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold">Популярные Фильмы</h1>
    <Link href="/movies">
      <p className="text-white px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all inline-block cursor-pointer">
        Все фильмы
      </p>
    </Link>
  </div>

  <div className="w-full mx-auto">
    <Carousel opts={{ align: "start" }} className="w-full max-w-[100%] 2xl:w-[100%] max-2xl:w-[100%]">
      <CarouselContent>
        {results.map((item) => (
          <CarouselItem key={item.id} className="inline-block p-2 basis-[45%] sm:basis-[45%] md:basis-[23%] lg:basis-[23%] xl:basis-[23%] 2xl:basis-[23%]">
            <div className="p-2">
              <div className="group hover:scale-[1.03] transition-all cursor-pointer">
                <CardContent className="flex flex-col p-0 items-start gap-2">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
                    alt={item.title || item.name || "Image"}
                    width={500}
                    height={400}
                    className="object-cover rounded-[15px] group-hover:shadow-xl transition-all"
                    loading="lazy"
                  />
                  <h2 className="text-white text-sm sm:text-base font-semibold text-center mt-2">
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
</div>


      <div className="container mx-auto px-4 py-12">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center">
          Популярные персоны
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {actors.slice(0, 2).map((actor) => (
              <div
                key={actor.id}
                className="relative h-96 rounded-xl overflow-hidden group"
              >
                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : '/placeholder-actor.jpg'
                  }
                  alt={actor.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent via-black/20">
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-white text-2xl font-bold">{actor.name}</h3>
                    <p className="text-yellow-400">
                      Популярность: {actor.popularity.toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 flex-1 overflow-y-auto max-h-96">
            <h3 className="text-white text-xl font-bold mb-4">Топ актеров</h3>
            <ul className="space-y-4">
              {actors.map((actor, index) => (
                <li key={actor.id} className="border-b border-gray-700 pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-yellow-400 mr-2">{index + 1}.</span>
                      <span className="text-white">{actor.name}</span>
                    </div>
                    <span className="text-yellow-400 text-sm">
                      {actor.popularity.toFixed(0)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/50 backdrop-blur-md py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Подпишитесь на рассылку новостей
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Будьте в курсе всех последних новинок кино и сериалов!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="px-4 py-3 rounded-lg flex-1 text-black"
            />
            <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
              Подписаться
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;