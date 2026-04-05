import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useParams } from "react-router";
import { PacmanLoader } from "react-spinners";
const ViewPage = () => {
  const params=useParams();
  const {productId}=params;
  const[product,setProduct]=useState({});
  const [loading,setLoading]=useState(false);
  const getProductInfo= async()=>{
    try {
      setLoading(true);
      const response=await fetch(`https://dummyjson.com/products/${productId}`);
      const data=await response.json();
      console.log(data);
      setProduct(data);
    } catch (error) {
      alert(`Error getting product info: ${error.message}`);
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    getProductInfo();
  },[])
  return (
    <>
      <Navbar/>
      <main>
        {
          loading?(<div className="h-20 flex items-center justify-center">
            {/* /*<p className=" text-2xl text-pink-400">Loading....</p>*/}
            <PacmanLoader/>
          </div>)
        :(
        <>
        <h1>{product.title}</h1>
        <div className="flex flex-wrap gap-6 items-center justify-center">
          {
            product.images?.map((ele)=>{
              return <img src={ele} width={200}/>;
            })
          }
        </div>
        </>
        )}
      </main>
      <Footer />
    </>
  );
};

export { ViewPage };
