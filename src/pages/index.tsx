import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-[665px] w-[390px] p-[20px]">
      <img className="animate-pulse" src="/svgs/logo.svg" alt="" />
      <p className="text-[32px] font-[500]">stamps!</p>
      <p className="absolute bottom-[36px] text-[16px]">by entropy labs</p>
    </div>
  );
}
