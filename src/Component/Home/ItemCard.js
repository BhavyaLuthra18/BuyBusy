// For calling reducer actions
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useState } from "react"; // Import useState for managing loading state

// CSS styles
import styles from "../../styles/home.module.css";

// Thunks for cart actions
import { addToCartAndIncreaseCountThunk } from "../../Redux/Reducers/cartReducer";
import { addToCartThunk } from "../../Redux/Reducers/productReducer";

// Component to render a single product item on the screen
export default function ItemCard(props) {
  // For calling actions
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [loading, setLoading] = useState(false); // Local state for loading
  const [added, setAdded] = useState(false); // State to track if item is added

  // Getting all the values of the product from props
  const { name, image, price, category } = props.item;

  const handleAddToCartClick = async () => {
    setLoading(true); // Set loading to true

    // Dispatch addToCartThunk
    await dispatch(addToCartThunk(props.item));
    // Dispatch increase cart count action
    await dispatch(addToCartAndIncreaseCountThunk(props.item));

    // Console log a message when the item is added to the cart
    console.log(`${name} added to the cart!`);

    setLoading(false); // Set loading to false after the action is complete
    setAdded(true); // Mark item as added
  };

  const handleGoToCartClick = () => {
    navigate("/cart"); // Redirect to /cart
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        {/* Image container */}
        <div className={styles.imageContainer}>
          <img src={image} alt={category} />
        </div>
        {/* Description of the product name, price, add button */}
        <div className={styles.itemInfo}>
          <div className={styles.namePrice}>
            {/* Name of the Product */}
            <div className={styles.name}>{name}</div>
            {/* Price of the Product */}
            <div className={styles.price}> ₹{price}</div>
          </div>
          {/* Add to cart button */}
          <div className={styles.btnContainer}>
            <button
              className={styles.addBtn}
              style={{
                color: "rgb(65,20,99)",
                border: "2px solid rgb(65,20,99)",
                backgroundColor: "white",
                marginTop: "15px",
              }}
              onClick={added ? handleGoToCartClick : handleAddToCartClick}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Adding..." : added ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

