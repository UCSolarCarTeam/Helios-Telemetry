import Image from "next/image";

function LogoComponent() {
  return (
    <div className="w-full pt-2">
      <Image
        className="m-auto w-3/4"
        src="/assets/Logo.png"
        alt="Solar Car Logo"
        width={200}
        height={100}
      />
    </div>
  );
}

export default LogoComponent;
