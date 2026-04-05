import React from "react";
import { useNavigate } from "react-router";
const ProductCard = (props) => {
  const { title, price, thumbnail, id } = props;
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/${id}/view`);
  };
  return (
    <div
      className="mb-4 p-5 grid grid-cols-[200px_1fr] bg-cyan-100 rounded-xl max-w-200"
      onClick={handleViewProduct}
    >
      <div>
        <img src={thumbnail} width="200" />
      </div>
      <div>
        <p>{title}</p>
        <p>Rs. {price * 80}</p>
      </div>
    </div>
  );
};
export { ProductCard };
