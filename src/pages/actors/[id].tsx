import { GetServerSideProps } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const apiKey = "956055ece61ff6da16e896668e0403e2";
  const actorRes = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=ru`
  );
  const actorData = await actorRes.json();


  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&language=ru`
  );
  const creditsData = await creditsRes.json();


  const imagesRes = await fetch(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}`
  );
  const imagesData = await imagesRes.json();
  const profiles = imagesData.profiles || [];

  return {
    props: {
      actorData,
      movieCredits: creditsData.cast || [],
      profiles,
    },
  };
};


import React from "react";
import Image from "next/image";


interface ActorPageProps {
  actorData: {
    name: string;
    biography: string;
    profile_path: string | null;
    place_of_birth: string;
    birthday: string;
  };
  movieCredits: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
  }[];
  profiles: {
    file_path: string;
  }[];
}

const ActorPage: React.FC<ActorPageProps> = ({ actorData}) => {
  const profileImage = actorData.profile_path
    ? `https://image.tmdb.org/t/p/w500${actorData.profile_path}`
    : "/no-image.png";

  return (
    <div className=" mx-auto p-6 w-full min-h-screen "
   
      style={{
        backgroundImage: `linear-gradient(rgba(30, 37, 56, 0.84), rgb(30, 37, 56)), url('https://s3-alpha-sig.figma.com/img/7a18/8e13/0f7ceb74f39c8622dfb623220e93a372?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Y8maWieZUsF-EVo-TZtzArjAe5AVeAbk9VY4vxYe9mkBnTQXFZ8Gp2omhrqjfI09HL5FzqXb2KIHQB4fKk9z3rKILSSxnCJUAVOrRs21ODJVjeqGODRfXMb3mi2~Ll-JZp-IP5pEPixr-KKYtgtt1vpAktkPXeJ5BBIxO1ujJpNf1NCQzO82ZEoZE7PP2OdEeK3NM5YXsqW3YuUXNAbOW4G~VDLJ2uWoru458WCcjAgRs2b~CTpfnfjBt2ykFhX95D4Dut~QNSuD6~O2HlWCnU9wzQBX4J1KsZCFYDf0u-xbVVyWrGJ41sXHOezWpL0J7WA4PKS15t3UerC3bNt52Q__')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    
    
    >
        <Header></Header>
        <div className="flex flex-col md:flex-row gap-8 mb-12 text-white mx-auto  items-center justify-center pt-[50px] ">
  
  <div className="w-full md:w-1/3">
    <h1 className="text-4xl font-bold mb-4">{actorData.name}</h1>
    <p className="text-gray-600 mb-2">
      <strong>Место рождения:</strong> {actorData.place_of_birth || "Неизвестно"}
    </p>
    <p className="text-gray-600 mb-6">
      <strong>Дата рождения:</strong> {actorData.birthday || "Неизвестно"}
    </p>
    <h2 className="text-2xl font-semibold mb-2">Биография</h2>
    <p className="text-white w-[500px] mb-4">
      {actorData.biography.slice(0, 949) || "Биография недоступна."}
    </p>
    
    {actorData.biography.length > 949 && (
      <button className="text-blue-500 mt-2">Показать больше</button>
    )}
  </div>

  <div className="w-full md:w-1/5 mb-4 md:mb-0"> 
    <Image
      src={profileImage}
      alt={actorData.name}
      width={400}
      height={600}
      className="rounded-2xl object-cover shadow-lg "
    />
  </div>
</div>


<Footer></Footer>
      
    </div>
  );
};

export default ActorPage;

