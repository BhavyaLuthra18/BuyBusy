//css styles
import styles from "../../styles/home.module.css";

// render the filter bar
export default function FilterBar(props) {
  const { setCategory } = props;

  return (
    // main container of the filter bar
    <div className={styles.filterBar}>
      {/* heading */}

      {/* sort items by category */}
      <div className={styles.categoryBox}>
        {/* Sub Heading */}
        <div>
          <p style={{ textAlign: "center", fontSize: "1.4rem" }}>
            What are you shopping today?
          </p>

          {/* Flex container for categories */}
          <div style={{ display: "flex", gap: "50px" }}>
            {/* All */}
            <div
              onClick={() => setCategory("none")}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="/images/all1.jpg"
                width={60}
                height={60}
                alt="None"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <label htmlFor="none">All</label>
            </div>
            {/* Men Category */}
            <div
              onClick={() => setCategory("men")}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="/images/men3.jpg"
                width={60}
                height={60}
                alt="Men"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <label htmlFor="men">Men</label>
            </div>

            {/* Women Category */}
            <div
              onClick={() => setCategory("women")}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="/images/women3.jpeg"
                width={60}
                height={60}
                alt="Women"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <label htmlFor="women">Women</label>
            </div>

            {/* Electronics Category */}
            <div
              onClick={() => setCategory("electric")}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src="/images/electronics3.jpg"
                width={60}
                height={60}
                alt="Electronic"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <label htmlFor="electric">Electronic</label>
            </div>

            {/* Jewellery */}
            <div
              onClick={() => setCategory("jewellery")}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src="/images/jewellery1.jpg"
                width={60}
                height={60}
                alt="Jewellery"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <label htmlFor="jewellery">Jewellery</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
