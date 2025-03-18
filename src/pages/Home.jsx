import { useNavigate } from "react-router-dom";
import phathai from "../assets/phathai1.jpg";

const Home = () => {
  const navigate = useNavigate(); // ✅ ต้องประกาศตัวแปรนอก JSX

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${phathai})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-6xl font-bold text-[#F5F5F5]">THAI THREADS</h1>
          <p className="mb-5 text-xl text-[#F5F5F5]">
            สัมผัสความงามของผ้าไทยแท้ ใส่ใจทุกฝีเข็ม ทุกลวดลาย
          </p>
          <button
            onClick={() => navigate("/Products")} 
            className="px-4 py-2 rounded-lg text-[#F5F5F5] bg-[#A31621] hover:bg-[#800F17] transition duration-300">
            สั่งซื้อ
          </button>

        </div>
      </div>
    </div>
  );
};

export default Home;
