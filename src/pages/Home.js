import React from "react";
import loginImage from "./undraw_web_shopping_re_owap.svg";
import styles from "./Home.module.css";
import { ImArrowRight } from "../icons/icon";
import { useDataContext } from "../hook/index";
import { ProductCard } from "../components";
import { useNavigate } from "react-router";
import uniqid from "uniqid";

const Home = () => {
  const {
    state: { productList },
  } = useDataContext();
  const navigate = useNavigate();

  const categories = [
    {
      _id: uniqid(),
      name: "T-shirt",
      img: "https://www.prowrestlingtees.com/pub/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/b/a/barbershopwindow9120-1-26f3.png",
    },
    {
      _id: uniqid(),
      name: "Face Mask",
      img: "https://www.prowrestlingtees.com/pub/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/z/e/zebratalk1026-1.png",
    },
    {
      _id: uniqid(),
      name: "Mugs",
      img: "https://www.prowrestlingtees.com/pub/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/o/r/orange_cassidy_-_freshly_squeezed_11_oz._mug.png",
    },
    {
      _id: uniqid(),
      name: "Hoodie",
      img: "https://www.prowrestlingtees.com/pub/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/c/o/colt9068-1.png",
    },
    {
      _id: uniqid(),
      name: "Beanie",
      img: "https://www.prowrestlingtees.com/pub/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/z/e/zebratalk1013.png",
    },
  ];

  const topSellingItems = productList.filter(
    (product, index) => index % 2 === 0 && product.inStock
  );

  const navigateToProductsPage = () => {
    navigate("/products");
  };

  const navigateToCategoryPage = (catId) => {
    if (catId === "Face Mask") {
      navigate("/category/Face-Mask");
    } else {
      navigate(`/category/${catId}`);
    }
  };

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroText}>
          <h1>
            Discover the best finance content through timeless books by top
            authors
          </h1>
          <p>
            Thoughtfully curated collection to help you get started with your
            personal finance journey.
          </p>
          <button
            className={styles.heroBtn}
            onClick={() => navigateToProductsPage()}
          >
            Start Shopping
            <ImArrowRight className={styles.heroBtnIcon} />
          </button>
        </div>
        <div className={styles.heroImage}>
          <img src={loginImage} alt="home" />
        </div>
      </div>

      <div className={styles.categoryWrapper}>
        <h2>Categories</h2>
        <div className={styles.categoryComponent}>
          {categories.map(({ _id, name, img }) => {
            return (
              <div
                className={styles.categoryCard}
                onClick={() => navigateToCategoryPage(name)}
                key={_id}
              >
                <img src={img} alt={name} />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.ofTheWeekWrapper}>
        <h2>Top Selling Items of the Week</h2>
        <div className={styles.ofTheWeekWrapperCardWrapper}>
          {topSellingItems.map(
            (
              { _id, name, desc, image, price, fastDelivery, inStock, offer },
              index
            ) => {
              return (
                <ProductCard
                  key={_id}
                  productId={_id}
                  index={index}
                  dismissBtn={false}
                  name={name}
                  desc={desc}
                  image={image}
                  price={price}
                  fastDelivery={fastDelivery}
                  inStock={inStock}
                  offer={offer}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export { Home };
