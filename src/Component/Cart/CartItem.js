// CartItem.jsx
import { useDispatch } from "react-redux";
import oldStyles from "../../styles/home.module.css";
import styles from "../../styles/cart.module.css";
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import {
  increaseQuantThunk,
  decreaseQuantThunk,
} from "../../Redux/Reducers/productReducer";

import  {removeFromCartAndDecreaseCountThunk} from "../../Redux/Reducers/cartReducer"

export default function CartItem(props) {
  const dispatch = useDispatch();
  const { name, image, price, category, quantity } = props.product;

  return (
    <div className={oldStyles.cardContainer}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img src={image} alt={category} />
      </div>
      {/* Product Info */}
      <div className={styles.itemInfo}>
        <div>{name}</div>
        <div className={styles.priceQuant}>
          <div className={styles.price}>₹{price}</div>
          {/* Quantity Control */}
          <div className={styles.quantity}>
            <span
              className={styles.minus}
              onClick={() => dispatch(decreaseQuantThunk(props.product))}
            >
              <FaCircleMinus />
            </span>
            &nbsp;{quantity}&nbsp;
            <span
              className={styles.plus}
              onClick={() => dispatch(increaseQuantThunk(props.product))}
            >
              <FaPlusCircle />
            </span>
          </div>
        </div>
        {/* Remove Button */}
        <div className={styles.btnContainer}>
          <button
            className={styles.removeBtn}
            onClick={() => dispatch(removeFromCartAndDecreaseCountThunk(props.product))}
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
}
