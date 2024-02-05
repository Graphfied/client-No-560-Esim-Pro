import Image from "next/image";
import LoginPageImage from "../../../../public/login/login-banner.png";
import { LoginComponent } from "@/components/LoginComponent";

export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row mx-auto mb-14 w-full 2xl:w-[1500px] 3xl:w-[1400px] 3xl:gap-x-16">
      {/* Left Side Image */}
      <div className="flex items-center lg:mx-2 relative w-full lg:w-[700px] xl:w-[900px]">
        {/* Image Container */}
        <div className="relative w-full lg:w-full ">
          <Image
            src={LoginPageImage}
            alt=""
            className="object-cover w-full h-auto md:h-[350px] lg:h-[600px] xl:h-auto"
          />
          {/* Opacity Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            {/* Text */}
            <div className="text-white text-2xl sm:text-4xl md:text-[2.5rem] leading-tight mb-4 w-full max-w-[500px] text-center lg:text-left lg:pl-8">
              <strong className="">Welcome to MobiMatter</strong>
              <h1>Get access to travel eSIMs for over a hundred countries</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-grow">
        <LoginComponent />
      </div>
    </div>
  );
}
