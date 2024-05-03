import Modal from "../ui/Modal";
import CategoryItemMobile from "./CategoryItemMobile";

function CategoriesMobile() {
  return (
    <Modal>
      <div className="mb-4  min-[1024px]:hidden  ">
        <CategoryItemMobile>All</CategoryItemMobile>
        <CategoryItemMobile>Church</CategoryItemMobile>
        <CategoryItemMobile>Coding</CategoryItemMobile>
        <CategoryItemMobile>random</CategoryItemMobile>
        {/* <div className="flex justify-end ">
          <Modal.Open opens={"newCategory"}>
            <button className="bg-purple-300 p-2 rounded-lg inline-block hover:bg-purple-400 transition-all duration-300 ">
              Add new category
            </button>
          </Modal.Open>
        </div>
        <Modal.Window name={"newCategory"}>
          <div className=" w-80 ">
            <h3 className="text-md font-semibold text-stone-800">
              Category Name
            </h3>
            <input
              type="text"
              className="w-full rounded-md outline-none focus:outline-none px-4 py-2 "
            />
          </div>
        </Modal.Window> */}
      </div>
    </Modal>
  );
}

export default CategoriesMobile;
