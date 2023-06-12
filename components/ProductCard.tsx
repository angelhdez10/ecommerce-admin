const ProductCard = ({ id, name, description, price, mainImage }) => {
  return (
    <div
      id={id}
      className="containerProduct flex items-center justify-center w-1/5"
    >
      <div className="cardImage w-full">
        <img src={mainImage} alt={`img`} />
      </div>
      <div className="cardInfo">
        <h4>{name}</h4>
        <div>{description}</div>
        <span>{price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
