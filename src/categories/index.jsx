import { useTodo } from "../TodoContext";
import Heading from "../ui/HeadingTag";
import Modal from "../ui/Modal";
import CategoryItem from "./CategoryItem";

function Categories() {
  const categories = ["codingq", "WRIITING", "READING"];
  const { darkMode } = useTodo();
  return (
    <Modal>
      <div className="mt-16 w-9/12 mx-auto ">
        <Heading as="h2">Categories</Heading>

        <ul
          className={`${
            darkMode ? "bg-[#25273c] divide-[#4d5066]" : "bg-white"
          } divide-y rounded-lg`}
        >
          {categories.length === 0 ? (
            <li className="py-4 px-6"> No Category yet add one to start 👇</li>
          ) : (
            categories.map((category) => (
              <CategoryItem category={category} key={category} />
            ))
          )}
        </ul>
        <div className="flex justify-end mt-4">
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
        </Modal.Window>
      </div>
    </Modal>
  );
}

export default Categories;
