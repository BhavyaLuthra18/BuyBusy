// to call reducer actions
import { useDispatch } from "react-redux";

// css styles from old other file
import oldStyles from "../../styles/home.module.css";
// new css styles
import styles from "../../styles/cart.module.css";

//import icons
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";

// thunk actions from the Product Reducer
import {
  removeFromCartThunk,
  increaseQuantThunk,
  decreaseQuantThunk,
} from "../../Redux/Reducers/productReducer";

// render single cart item
export default function CartItem(props) {
  //for calling action
  const dispatch = useDispatch();

  // product data from props
  const { name, image, price, category, quantity } = props.product;

  return (
    <>
      {/*item card container*/}
      <div className={oldStyles.cardContainer}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          {/*product image*/}
          <img src={image} alt={category} />
        </div>
        {/* description of the product name,price, add button */}
        <div className={styles.itemInfo}>
          {/* product name */}
          <div>{name}</div>
          <div className={styles.priceQuant}>
            {/* Price of the product*/}
            <div className={styles.price}>₹{price}</div>
            {/* quantity of the product*/}
            <div className={styles.quantity}>
              {/*to decrease product quantity*/}
              <span
                className={styles.minus}
                onClick={() => dispatch(decreaseQuantThunk(props.product))}
              >
                <FaCircleMinus />
              </span>
              {/* quantity*/}
              &nbsp;{quantity}&nbsp;
              {/*increase product quantity*/}
              <span
                className={styles.plus}
                onClick={() => dispatch(increaseQuantThunk(props.product))}
              >
                <FaPlusCircle />
              </span>
            </div>
          </div>

          {/* remove from cart button*/}
          <div className={styles.btnContainer}>
            <button
              className={styles.removeBtn}
              onClick={() => dispatch(removeFromCartThunk(props.product))}
            >
              Remove from Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
