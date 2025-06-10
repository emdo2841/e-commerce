// components/SearchModal.jsx
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchModal = () => {
  const { searchOpen, searchQuery, setSearchOpen, setSearchQuery } =
    useSearch();
  const navigate = useNavigate();

  if (!searchOpen) return null;

  return (
    <>
      {/* Blur Overlay */}
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/10 pointer-events-none" />

      {/* Search Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-6 w-full h-40 max-w-md relative">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            close
          </button>
          <h2 className="text-lg font-semibold mb-4">Search</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchOpen(false);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search products..."
          />
        </div>
      </div>
    </>
  );
};

export default SearchModal;
