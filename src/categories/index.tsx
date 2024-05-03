import { useTodo } from "../TodoContext";
import Heading from "../ui/HeadingTag";
import Modal from "../ui/Modal";
import CategoryItem from "./CategoryItem";

function Categories() {
  const categories = [
    {
      id: 1,
      name: "Category 1",
      description: "This is category 1",
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "Category 2",
      description: "This is category 2",
      createdAt: new Date(),
    },
    {
      id: 3,
      name: "Category 3",
      description: "This is category 3",
      createdAt: new Date(),
    },
  ];
  const { darkMode } = useTodo()!;
  return (
    <Modal>
      <div className="mt-16 w-9/12 mx-auto ">
        <Heading as="h4">Categories</Heading>

        <ul
          className={`${
            darkMode ? "bg-[#25273c] divide-[#4d5066]" : "bg-white"
          } divide-y rounded-lg`}
        >
          {categories.length === 0 ? (
            <li className="py-4 px-6"> No Category yet add one to start 👇</li>
          ) : (
            categories.map((category) => (
              <CategoryItem category={category} key={category.name} />
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
