import React from "react";
import Image from "next/image";
import Link from "next/link";
const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 text-center pt-5">
      <div className="bg-gradient-to-r from-blue-500 to-[url('https://s3-alpha-sig.figma.com/img/a3fe/19eb/772aa887e087df3d8b2d9ce572c59698?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jTvLQeiaWl7aWUlnfKq2OiIiX5JwFTwAOXPYHOSk3lMjoIuBvWcbFZ71XnThOLC0QlYZ2xDGcUrIkB5nRN6WcAs3ZZGPZHWgmZDDMU70wqI0FkLNWi6noRNGQj1eoyi8A4djD8IvyLFudMbM8m9kjGAoSTpzlI1Jeou9YIZN~qEilHKODnPF6KBZb8w0FcxTQUVK0So2u9N65-Snl7AytCUytpnGnJO0M913esEtj9ju9baVUsxkGYwCNqogsirvrSvqq~Hof3RGOAuk64PIVwmPLff9EtcjRQXSbZXqIoDrN~l7IY~gihRUUWfV~xvghlRGfF6sWN0r7mRQbb1q6Q__')] bg-cover bg-center py-16 w-[80%] mx-auto h-[400px] rounded-[10px]"
      style={{
        backgroundImage: `linear-gradient(rgba(29, 58, 160, 0.9), rgba(29, 58, 160, 0.9)), url('https://s3-alpha-sig.figma.com/img/a3fe/19eb/772aa887e087df3d8b2d9ce572c59698?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jTvLQeiaWl7aWUlnfKq2OiIiX5JwFTwAOXPYHOSk3lMjoIuBvWcbFZ71XnThOLC0QlYZ2xDGcUrIkB5nRN6WcAs3ZZGPZHWgmZDDMU70wqI0FkLNWi6noRNGQj1eoyi8A4djD8IvyLFudMbM8m9kjGAoSTpzlI1Jeou9YIZN~qEilHKODnPF6KBZb8w0FcxTQUVK0So2u9N65-Snl7AytCUytpnGnJO0M913esEtj9ju9baVUsxkGYwCNqogsirvrSvqq~Hof3RGOAuk64PIVwmPLff9EtcjRQXSbZXqIoDrN~l7IY~gihRUUWfV~xvghlRGfF6sWN0r7mRQbb1q6Q__')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
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
              className="px-4 py-3 rounded-lg flex-1 text-gray-500  border bg-white "
            />
            <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
              Подписаться
            </button>

            
          </div>
          <div className="w-fit mx-auto mb-4 md:mb-0 pt-[20px]">
  <Link href="/" className="flex gap-2 items-center cursor-pointer">
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
      <h1 className="text-[white]">area</h1>
    </div>
  </Link>
</div>

        </div>
      </div>

      <div className="flex flex-col gap-4 pt-[50px]">
        <h1>2020 © Kinoarea.  Все права защищены</h1>
        <p>Политика конфиденциальности</p>
      </div>
    </footer>
  );
};

export default Footer;
