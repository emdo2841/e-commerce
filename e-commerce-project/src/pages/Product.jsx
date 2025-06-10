import api from "../context/api";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useCart } from "../context/CartContext";
import { Bars } from "react-loading-icons";
import Err from "../components/NetworkServerErr";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();
  // const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const url = "/products";
  useEffect(() => {
    const product = async () => {
      try {
        let url = `/product?page=${page}&limit=${limit}`;
        if (q) url += `&search=${encodeURIComponent(q)}`;
        const response = await api.get(url);
        setProducts(response.data.data || []);
        setTotalProducts(response.data.total || 0);
        console.log(products);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    product()
  }, [limit, page, q]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Bars />
      </div>
    );
  }

  if (error) return <Err url={url} />;

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product._id || product.id}>
            {product.name || "Unnamed Product"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

// import api from "../context/api";
// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { Bars } from "react-loading-icons";
// import Err from "../components/NetworkServerErr";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(20);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const [searchParams] = useSearchParams();
//   const q = searchParams.get("q") || "";
//   const retryUrl = "/products";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let url = `/product?page=${page}&limit=${limit}`;
//         if (q) url += `&search=${encodeURIComponent(q)}`;
//         const response = await api.get(url);
//         setProducts(response.data.data || []);
//         setTotalProducts(response.data.total || 0);
//       } catch (error) {
//         console.log(error);
//         setError(error.response?.data?.message || error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [limit, page, q]);

//   if (loading) {
//     return (
//       <div className="flex-col p-4 h-screen flex items-center justify-center">
//         <Bars />
//       </div>
//     );
//   }

//   if (error) {
//     return <Err url={retryUrl} />;
//   }

//   const totalPages = Math.ceil(totalProducts / limit);

//   return (
//     <div>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id || product.id}>
//             {product.name || "Unnamed Product"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Products;
