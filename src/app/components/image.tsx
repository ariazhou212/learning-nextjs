import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function ImageCom(prop: { imgURL: StaticImport }) {
  return (
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src={prop.imgURL}
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </div>
  );
}
