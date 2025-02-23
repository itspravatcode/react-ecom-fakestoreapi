import CategoryFilter from "./CategoryFilter";

const Filters = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Filters</h2>
      <CategoryFilter />
    </div>
  );
};

export default Filters;