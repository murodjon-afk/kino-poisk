import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState ,useEffect } from 'react';

const categories = ['Афиша', 'Медиа', 'Фильмы', 'Актеры', 'Новости', 'Подборки', 'Категории'];

const Header: React.FC = () => {

  const [userName, setUserName] = useState<string | null>(null);

useEffect(() => {
  const name = localStorage.getItem("userFirstName");
  if (name) {
    setUserName(name);
  }
}, []);





  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-4 " id='header '>
      
      <Link href={"/"}>
        <div className="flex gap-2 items-center cursor-pointer mb-4 md:mb-0">
        <Image
  src="/cinema 1.svg"
  alt="logo"
  width={40}  
  height={40} 
  className="md:w-[50px] md:h-[50px]"  
  loading="lazy"
/>
          <div className="flex text-xl md:text-2xl">
            <h1 className="text-white">Kino</h1>
            <h1 className="text-[#3657cb]">area</h1>
          </div>
        </div>
      </Link>

      <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category, index) => (
          <h2
            key={index}
            className="text-white text-sm md:text-base px-2 py-1 md:py-2 rounded-xl hover:text-blue-600 transition cursor-pointer"
            id='category'
          >
            {category}
          </h2>
        ))}

        

      </nav>

      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-[10px] cursor-pointer text-lg">🔍</button>
        {userName ? (
          <div className="text-xl text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-[#3657CB] transition-transform transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500">
          {userName.slice(0,1)}
        </div>
      ) : (
        <Link href="/auth">
          <button className="h-10 md:h-12 bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500 focus:outline-none transition-all duration-300 cursor-pointer">
            Войти
          </button>
        </Link>
      )}
        <button className='w-10 h-10 bg-white flex items-center justify-center rounded-[10px]' id='burger'><svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-6 h-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4 6h16M4 12h16M4 18h16"
  />
</svg>
</button>
      </div>
    </header>
  );
};

export default Header;
