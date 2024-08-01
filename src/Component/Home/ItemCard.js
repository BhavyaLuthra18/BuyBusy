// for calling reducer actions
import { useDispatch } from "react-redux";

//css styles
import styles from "../../styles/home.module.css";

// thunk action from product rreducer
import { addToCartThunk } from "../../Redux/Reducers/productReducer";

// component to render single product item on the screen
export default function ItemCard(props) {
  // for calling actions
  const dispatch = useDispatch();
  //getting all the value of the product from props
  const { name, image, price, category } = props.item;

  const handleAddToCartClick = () => {
    // dispatch addToCartThunk
    dispatch(addToCartThunk(props.item));

    // console.log a message when the item is added to the cart
    console.log(`${name} added to the cart!`);
  };

  return (
    <>
      {/*main container */}
      <div className={styles.cardContainer}>
        {/*Image  container */}
        <div className={styles.imageContainer}>
          <img src={image} alt={category} />
        </div>
        {/* description of the product name,price, add button */}
        <div className={styles.itemInfo}>
          <div className={styles.namePrice}>
            {/*name of the Product*/}

            <div className={styles.name}>{name}</div>

            {/* Price of the Product*/}

            <div className={styles.price}> ₹{price}</div>
          </div>
          {/*add to cart button*/}
          <div className={styles.btnContainer}>
            <button className={styles.addBtn} onClick={handleAddToCartClick}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
