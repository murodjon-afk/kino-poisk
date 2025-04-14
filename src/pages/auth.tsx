
import Image from "next/image";
import Link from "next/link";

const AuthPage = () => {

    return (
        <section
        className="w-full min-h-screen flex items-center justify-center flex-col text-center gap-5"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 37, 56, 0.9), rgb(30, 37, 56)), url('https://s3-alpha-sig.figma.com/img/7a18/8e13/0f7ceb74f39c8622dfb623220e93a372?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Y8maWieZUsF-EVo-TZtzArjAe5AVeAbk9VY4vxYe9mkBnTQXFZ8Gp2omhrqjfI09HL5FzqXb2KIHQB4fKk9z3rKILSSxnCJUAVOrRs21ODJVjeqGODRfXMb3mi2~Ll-JZp-IP5pEPixr-KKYtgtt1vpAktkPXeJ5BBIxO1ujJpNf1NCQzO82ZEoZE7PP2OdEeK3NM5YXsqW3YuUXNAbOW4G~VDLJ2uWoru458WCcjAgRs2b~CTpfnfjBt2ykFhX95D4Dut~QNSuD6~O2HlWCnU9wzQBX4J1KsZCFYDf0u-xbVVyWrGJ41sXHOezWpL0J7WA4PKS15t3UerC3bNt52Q__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >

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
       <div className="flex flex-col gap-3">
        <h1 className="text-white text-[40px]">Войти</h1>

        <input
  type="name"
  className="w-[400px] h-[60px] bg-gray-700 placeholder-white text-white px-4 rounded-2xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[#4c8bff] focus:shadow-lg"
  placeholder="Имя"
/>





<input
  type="password"
  className="w-[400px] h-[60px] bg-gray-700 placeholder-white text-white px-4 rounded-2xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[#4c8bff] focus:shadow-lg"
  placeholder="Пароль"
/>

<button   className="w-[400px] h-[60px] bg-yellow-500 placeholder-white text-white px-4 rounded-2xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[white] focus:shadow-lg mt-3  cursor-pointer"> Войти</button>
<Link href={'/login'}>
<button   className="w-[400px] h-[60px] bg-[#2b7fff] placeholder-white text-white px-4 rounded-2xl outline-none transition-all duration-300 focus:ring-2 focus:ring-[white] focus:shadow-lg cursor-pointer"       > Регистрация</button>
</Link>



  
       </div>



      </section>
    );
  };
  
  export default AuthPage;
  