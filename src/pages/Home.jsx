import { useNavigate } from "react-router-dom";
import phathai from "../assets/phathai1.jpg";
import Navbar from "../components/Navbar";
import '../index.css'; // เพิ่มบรรทัดนี้ถ้ายังไม่มี

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${phathai})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-white">
              THAI THREADS
            </h1>
            <p className="mb-5 text-xl text-white">
              สัมผัสความงามของผ้าไทยแท้ ใส่ใจทุกฝีเข็ม ทุกลวดลาย
            </p>
            <button
              onClick={() => navigate("/Products")}
              className="px-4 py-2 rounded-lg text-white bg-[#E11D48] hover:bg-[#BE123C] transition duration-300"
            >
              สั่งซื้อ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
