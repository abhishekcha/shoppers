import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useSearchParams } from "react-router";
import { ProductCard } from "../components/ProductCard";
const LIMIT=10;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("text");
  const [products, setProducts] = useState([]);
  //console.log(products);
  
  const [loading, setLoading] = useState(false);
  const [page,setPage]=useState(1);
  const [total, setTotal] = useState(0);
  //console.log(page);
  
  const getSearchResults = async () => {
    try {
      setLoading(true);
      const skip=LIMIT*(page-1);
      await new Promise((resolve) => setTimeout(resolve,500));
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchText}&limit=${LIMIT}&skip=${skip}`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotal(data.total);

    } catch (error) {
      alert(`can not get search result: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSearchResults();
  }, [searchText,page]);
  const dummyArr = Array(5).fill("hello");
  return (
    <>
      <Navbar />
      <main className="grid grid-cols-[300px_1fr] gap-6 p-6">
        <div className="bg-pink-200"></div>
        {loading ? (
          <div>
            {dummyArr.map((ele, ind) => {
              return (
                <div key={ind}
                  className="mb-4 p-5 grid grid-cols-[200px_1fr] gap-5 bg-cyan-100 rounded-xl max-w-200"
                >
                  <div>
                    <div className="h-50 w-50 bg-gray-400">

                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className="h-5 bg-gray-400"></p>
                    <p className="h-5 bg-gray-400"></p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {products.map((ele) => {
              return <ProductCard key={ele.id} {...ele} />;
            })}
          </div>
        )}
      </main>
      {Math.ceil(total / LIMIT) > 1 && (
        <div className="pd-4 flex flex-wrap gap-5 items-center justify-center">
          <button
            className="py-2 px-4 rounded-md bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            &laquo; Prev
          </button>
          {Array.from({ length: Math.ceil(total / LIMIT) }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`py-2 px-4 rounded-md ${page === pageNum ? 'bg-rose-700 text-white' : 'bg-rose-500'}`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
          <button
            className="py-2 px-4 rounded-md bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === Math.ceil(total / LIMIT)}
          >
            Next &raquo;
          </button>
        </div>
      )}
      <Footer />
    </>
  );
};
export { SearchPage };
