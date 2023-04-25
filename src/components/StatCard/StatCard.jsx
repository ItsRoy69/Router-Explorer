import Tilt from "react-parallax-tilt";
import { useHover } from "@mantine/hooks";

const StatCard = ({ label, value }) => {
  const { hovered, ref } = useHover();

  return (
    <div className="h-44 w-52 2xl:h-52 2xl:w-64 bg-glass rounded-2xl m-8">
      <Tilt>
        <div
          className="h-44 w-52 2xl:h-52 2xl:w-64 bg-glass rounded-2xl translate-x-10 translate-y-10 hover:moving-gradient flex justify-center items-center"
          ref={ref}
        >
          <div className="flex justify-center items-center flex-col">
            <p
              className={`font-bold mb-4 text-4xl 2xl:text-5xl ${
                hovered ? "text-white" : "text-gradient"
              } `}
            >
              {value}
            </p>
            <p className="font-semibold text-center text-2xl 2xl:text-3xl">
              {label}
            </p>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default StatCard;
