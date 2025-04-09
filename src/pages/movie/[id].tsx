import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { GetServerSideProps } from "next";

type MovieData = {
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
};

const Movie: React.FC<{ movieData: MovieData }> = ({ movieData }) => {
  return (
    <section
      className="w-full h-[100vh]"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 37, 56, 0.84), rgb(30, 37, 56)), url('https://s3-alpha-sig.figma.com/img/7a18/8e13/0f7ceb74f39c8622dfb623220e93a372?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Y8maWieZUsF-EVo-TZtzArjAe5AVeAbk9VY4vxYe9mkBnTQXFZ8Gp2omhrqjfI09HL5FzqXb2KIHQB4fKk9z3rKILSSxnCJUAVOrRs21ODJVjeqGODRfXMb3mi2~Ll-JZp-IP5pEPixr-KKYtgtt1vpAktkPXeJ5BBIxO1ujJpNf1NCQzO82ZEoZE7PP2OdEeK3NM5YXsqW3YuUXNAbOW4G~VDLJ2uWoru458WCcjAgRs2b~CTpfnfjBt2ykFhX95D4Dut~QNSuD6~O2HlWCnU9wzQBX4J1KsZCFYDf0u-xbVVyWrGJ41sXHOezWpL0J7WA4PKS15t3UerC3bNt52Q__')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
   <div className="flex flex-col  items-center justify-center ">
   <div className="p-4 rounded-lg flex items-center justify-center gap-5">
        <div className="">
        {movieData.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={movieData.title}
            className="w-[400px] h-[559px] rounded-lg mr-4"
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
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=956055ece61ff6da16e896668e0403e2`
  );
  const movieData = await res.json();

  return { props: { movieData } };
};

export default Movie;
