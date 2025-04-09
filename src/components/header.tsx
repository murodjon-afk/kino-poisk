import React from 'react';
import Link from 'next/link';

const categories = ['Афиша', 'Медиа', 'Фильмы', 'Актеры', 'Новости', 'Подборки', 'Категории'];

const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-4 ">
      
      <Link href={"/"}>
        <div className="flex gap-2 items-center cursor-pointer mb-4 md:mb-0">
          <img src="/cinema 1.svg" alt="logo" className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" />
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
          >
            {category}
          </h2>
        ))}
      </nav>

      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-[10px] cursor-pointer text-lg">🔍</button>
        <button className="h-10 md:h-12 bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500 focus:outline-none transition-all duration-300">
          Войти
        </button>
      </div>
    </header>
  );
};

export default Header;
