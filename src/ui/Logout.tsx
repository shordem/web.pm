import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../constants/auth";
import { Storage } from "../utilities/storage";
import ButtonIcon from "./ButtonIcon";
import LogoutIcon from "./icons/logout";

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
      <ButtonIcon>
        {" "}
        <LogoutIcon />
      </ButtonIcon>
    </button>
  );
}

export default Logout;
