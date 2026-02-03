export default function ProductList({ products }: { products: any[] }) {
  <div>
    {products.map((products) => (
      <div key={product.id}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <img src={products.image} alt="" />
      </div>
    ))}
  </div>;
}