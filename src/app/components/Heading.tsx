import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type HeadingProps = {
  title: string;
  age: number;
  isCute: boolean;
  imgUrl: StaticImport;
};

const Heading = ({ title, age, isCute, imgUrl }: HeadingProps) => {
  return (
    <>
      <h1>
        {title} is {age} and {isCute ? "very cute" : ""}
      </h1>
      <Image src={imgUrl} alt={""} />
    </>
  );
};

export default Heading;
