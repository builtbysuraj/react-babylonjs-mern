import { useState } from "react";
import axios from "axios";
import BabylonModel from "./BabylonModel";
import CanvasMap from "./CanvasMap";

const Home = () => {
  const [profileImg, setProfileImg] = useState("");
  const [data, setData] = useState();

  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    axios
      .post(`https://react-web-api.onrender.com/api/user-profile`, formData, {})
      .then((res) => {
        setData(res.data.userCreated.profileImg);
      });
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={onFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
      <CanvasMap />
      <BabylonModel data={data} />
    </>
  );
};

export default Home;
