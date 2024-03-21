import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image src="/logo.png" alt="Logo" height={36} width={24} />
    </div>
  );
}
