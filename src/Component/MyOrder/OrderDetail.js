// importing styles
import styles from "../../styles/myorder.module.css";

// render each order detail
export default function OrderDetail(props) {
  //order details from props
  const { date, list, amount } = props.order;
  //Single order container
  return (
    <div key={date}>
      {/*date of the order*/}
      <h1 className={styles.orderHeading}>Ordered On:{date}</h1>
      {/*table containing the order details*/}
      <table>
        {/* first row of the table*/}
        <tbody>
          <tr>
            <th>S.no</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
          {/*Rendering all the product's within order*/}
          {list.map((product, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.quantity * product.price}</td>
            </tr>
          ))}
          {/* last row to show the total amount of the order*/}
          <tr>
            <td colSpan={4}>Grand Total</td>
            <td>₹{amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
