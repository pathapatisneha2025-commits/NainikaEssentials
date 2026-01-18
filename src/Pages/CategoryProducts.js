import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PRODUCTS = [
  {
    id: 1,
    slug: "black-hoodie",
    name: "Black Hoodie",
    price: 1299,
    category: "hoodie",
    image: "/blackhoddie.jpeg",
    description: "Premium black cotton hoodie with a comfortable fit.",
  },
  {
    id: 2,
    slug: "grey-hoodie",
    name: "Grey Hoodie",
    price: 1399,
    category: "hoodie",
    image: "/hoodie.jpeg",
    description: "Stylish grey hoodie perfect for casual wear.",
  },
  {
    id: 3,
    slug: "casual-shirt",
    name: "Casual Shirt",
    price: 999,
    category: "shirts",
    image: "/shirts.jpeg",
    description: "Lightweight casual shirt suitable for everyday use.",
  },
  {
    id: 4,
    slug: "T-shirt",
    name: "CasualT Shirt",
    price: 999,
    category: "shirts",
    image: "/Tshirt.jpeg",
    description: "Lightweight casual shirt suitable for everyday use.",
  },
  {
    id: 5,
    slug: "formal-pants",
    name: "Formal Pants",
    price: 1199,
    category: "pants",
    image: "/whitepants.jpeg",
    description: "Slim-fit formal pants for office and occasions.",
  },
  {
    id: 6,
    slug: "formal-pants",
    name: "Formal Pants",
    price: 1199,
    category: "pants",
    image: "/greypants.jpeg",
    description: "Slim-fit formal pants for office and occasions.",
  },
  {
    id: 7,
    slug: "t-shirt",
    name: "T-Shirt",
    price: 699,
    category: "clothing",
    image: "/pinksaree.jpeg",
    description: "Soft cotton t-shirt with breathable fabric.",
  },
   
];

export default function CategoryProducts() {
  const { category } = useParams();
  const navigate = useNavigate();

  const filteredProducts = PRODUCTS.filter(
    (product) => product.category === category
  );

  const handleClick = (slug, id) => {
  navigate(`/product/${slug}/${id}`); // navigate to product details page with slug and id
};


  return (
    <>
      <style>{`
        .products-container {
          padding: 40px 6%;
          font-family: Inter, sans-serif;
        }

        .category-title {
          font-size: 32px;
          font-weight: 600;
          text-transform: capitalize;
          margin-bottom: 6px;
        }

        .category-subtitle {
          color: #6b7280;
          font-size: 15px;
          margin-bottom: 30px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        .product-card {
          cursor: pointer;
        }

        .image-box {
          position: relative;
          overflow: hidden;
        }

        .image-box img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover img {
          transform: scale(1.05);
        }

        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #f59e0b;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .discount {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #dc2626;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 8px;
          border-radius: 2px;
        }

        .product-info {
          padding-top: 10px;
        }

        .brand {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .product-name {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .price {
          font-size: 14px;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .products-container {
            padding: 20px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .image-box img {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="products-container">
        <h1 className="category-title">{category}</h1>
        <p className="category-subtitle">
          Explore products from this category
        </p>

        <div className="products-grid">
          {filteredProducts.length ? (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="product-card"
                onClick={() => handleClick(p.slug,p.id)}
              >
                <div className="image-box">
                  <span className="badge">Best Seller</span>
                  <span className="discount">50% OFF</span>
                  <img src={p.image} alt={p.name} />
                </div>

                <div className="product-info">
                  <div className="brand">ELAN COTTS</div>
                  <div className="product-name">{p.name}</div>
                  <div className="price">₹{p.price}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}
