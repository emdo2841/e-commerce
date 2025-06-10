import Header from "./components/Header";
import { useSearch } from "./context/SearchContext";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom"
import Products from "./pages/Product";
import Err from "./components/NetworkServerErr"
import ErrorBoundary from "./components/ErrorBoundary";


function App() {
  const { searchOpen, searchQuery, setSearchOpen, setSearchQuery } =
    useSearch();
  const navigate = useNavigate();
  const url = "/"

  return (
    <>
      <Header />
      <Err url={url} />

      {/* Wrap main in a relative container */}
      <div className="relative">
        {/* Conditionally render a blur overlay above <main> */}
        {searchOpen && (
          <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/10 pointer-events-none" />
        )}
        <ErrorBoundary>
          <Products />
        </ErrorBoundary>
        ;
        <main className="relative z-0 transition-all duration-300">
          <p className="text-center text-2xl font-bold mt-60">
            Welcome to the E-commerce Project!
          </p>
          <p className="text-center text-lg mt-4">
            Click on the Vite and React logos to learn more
          </p>
        </main>
      </div>

      {/* Modal stays on top */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 w-full h-40 max-w-md  relative">
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
                  e.preventDefault(); // optional: prevents form submission/refresh
                  navigate(
                    `/search?q=${encodeURIComponent(searchQuery.trim())}`
                  );
                  setSearchOpen(false); // close modal
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Search products..."
            />
          </div>
        </div>
      )}

      <Routes>
        <Route path="/product" element={<Products />} />
        <Route path="/search" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
