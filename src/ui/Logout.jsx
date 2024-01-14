import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Storage } from "../utilities/storage";
import { ACCESS_TOKEN_KEY } from "../constants/auth";

function Logout() {
  const navigate = useNavigate();
  const storage = new Storage();

  return (
    <button
      onClick={() => {
        navigate("/login");
        storage.deleteItem(ACCESS_TOKEN_KEY);
      }}
    >
      <HiArrowRightOnRectangle />
    </button>
  );
}

export default Logout;
