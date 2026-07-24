"use client";

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelectCategory("Todas")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
          selectedCategory === "Todas"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 border hover:bg-gray-50"
        }`}
      >
        Todas
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
            selectedCategory === cat
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 border hover:bg-gray-50"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}