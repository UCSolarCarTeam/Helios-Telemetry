import Image from "next/image";

function LogoComponent() {
  return (
    <div className="w-full pt-2">
      <Image
        alt="Solar Car Logo"
        className="m-auto w-3/4"
        height={100}
        layout="cover"
        src="/assets/Logo.png"
        width={100}
      />
    </div>
  );
}

export default LogoComponent;
