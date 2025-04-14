import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const AuthPage = () => {
  const [agreed, setAgreed] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  const handleRegister = () => {
    const namePattern = /^[A-Za-zА-Яа-я]{2,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^.{6,}$/;

    if (!agreed) {
      alert("Вы должны согласиться с политикой конфиденциальности.");
      return;
    }

    if (!namePattern.test(firstName)) {
      alert("Введите корректное имя.");
      return;
    }
    if (!namePattern.test(lastName)) {
      alert("Введите корректную фамилию.");
      return;
    }
    if (!emailPattern.test(email)) {
      alert("Введите корректный email.");
      return;
    }
    if (!passwordPattern.test(password)) {
      alert("Пароль должен содержать минимум 6 символов.");
      return;
    }

    localStorage.setItem("userFirstName", firstName);
    setIsRegistered(true); 
  };

  return (
    <section
      className="w-full min-h-screen flex items-center justify-center flex-col text-center gap-5"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 37, 56, 0.9), rgb(30, 37, 56)), url('https://s3-alpha-sig.figma.com/img/7a18/8e13/0f7ceb74f39c8622dfb623220e93a372?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=...')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex gap-2 items-center cursor-pointer mb-4 md:mb-0">
        <Image src="/cinema 1.svg" alt="logo" width={40} height={40} className="md:w-[50px] md:h-[50px]" loading="lazy" />
        <div className="flex text-xl md:text-2xl">
          <h1 className="text-white">Kino</h1>
          <h1 className="text-[#3657cb]">area</h1>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-white text-[40px]">Регистрация</h1>

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          pattern="^[A-Za-zА-Яа-я]{2,}$"
          className="w-[400px] h-[60px] bg-gray-700 placeholder-white text-white px-4 rounded-2xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[#4c8bff] focus:shadow-lg"
          placeholder="Имя"
          required
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          pattern="^[A-Za-zА-Яа-я]{2,}$"
          className="w-[400px] h-[60px] bg-gray-700 placeholder-white text-white px-4 rounded-2xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[#4c8bff] focus:shadow-lg"
          placeholder="Фамилия"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern=".{6,}"
          className="w-[400px] h-[60px] bg-gray-700 placeholder-white text-white px-4 rounded-2xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[#4c8bff] focus:shadow-lg"
          placeholder="Придумайте пароль"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
          className="w-[400px] h-[60px] bg-gray-700 placeholder-white text-white px-4 rounded-2xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[#4c8bff] focus:shadow-lg"
          placeholder="Email"
          required
        />

        <label className="flex items-center space-x-2 cursor-pointer py-2 text-white">
          <input
            type="checkbox"
            checked={agreed}
            onChange={handleChange}
            required
            className="peer hidden"
          />
          <div
            className={`w-5 h-5 rounded border border-gray-400 ${
              agreed ? "bg-yellow-500" : "bg-white"
            }`}
          />
          <span className="text-sm">
            Соглашаюсь с условиями{" "}
            <a href="/privacy" target="_blank" className="text-blue-600 underline">
              политикой конфиденциальности
            </a>
          </span>
        </label>

        {!isRegistered ? (
          <button
            onClick={handleRegister}
            className="w-[400px] h-[60px] bg-yellow-500 text-white px-4 rounded-2xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[white] focus:shadow-lg cursor-pointer"
          >
            Регистрация
          </button>
        ) : (
          <Link href="/" passHref>
            <button className="w-[400px] h-[60px] bg-green-600 text-white px-4 rounded-2xl transition-all duration-300 hover:bg-green-700">
              Перейти на главную
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
