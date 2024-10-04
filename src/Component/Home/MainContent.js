import { useState, useEffect, useRef } from "react";
import styles from "../../styles/home.module.css";
import ItemCard from "./ItemCard";
import { data } from "../../Assets/data";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function MainContent(props) {
  const { search, priceRange, category, applyFilter, setSortOrder, sortOrder } =
    props;

  // State to toggle dropdown visibility and active tab
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const dropdownRef = useRef(null);

  // Handler for sorting change
  const handleSortChange = (sortOption) => {
    setSortOrder(sortOption);
    setActiveTab(sortOption);
    setShowDropdown(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Sort the data based on the sortOrder
  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else if (sortOrder === "az") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "za") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  let filteredData = sortedData;

  if (search) {
    filteredData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply filtering based on price range
  if (applyFilter && priceRange) {
    filteredData = filteredData.filter((item) => item.price <= priceRange);
  }

  // Apply filtering based on category
  if (category && category !== "none") {
    filteredData = filteredData.filter((item) => item.category === category);
  }

  return (
    <div className={styles.itemContainer}>
      {/* Sort Section */}
      <div className={styles.priceRange}>
        <div
          className="Sortby"
          style={{
            display: "block",
            backgroundColor:"#9352A4",
            color: "white",
            borderRadius: "10px",
            padding: "10px",
            boxShadow:
              "0 0 20px rgba(155, 89, 182, 0.8), 0 0 40px rgba(142, 68, 173, 0.6)",
          }}
        >
          <span
            style={{
              cursor: "pointer",
              justifyContent: "center",
              alignContent: "center",
            }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Sort{" "}
            <RiArrowDropDownLine
              size={30}
              style={{ justifyContent: "center" }}
            />
          </span>
          <br />

          {/* Custom dropdown */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              style={{
                border: "1px solid #ccc",
                color: "black",
                position: "absolute",
                zIndex: 10,
                marginTop: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === "lowToHigh" ? "#DFC5FE" : "white",
                  borderBottom: "1px solid #ddd",
                }}
                onClick={() => handleSortChange("lowToHigh")}
              >
                Low to High
              </div>
              <div
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === "highToLow" ? "#DFC5FE" : "white",
                  borderBottom: "1px solid #ddd",
                }}
                onClick={() => handleSortChange("highToLow")}
              >
                High to Low
              </div>
              <div
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: activeTab === "az" ? "#DFC5FE" : "white",
                  borderBottom: "1px solid #ddd",
                }}
                onClick={() => handleSortChange("az")}
              >
                Alphabetically: A-Z
              </div>
              <div
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: activeTab === "za" ? "#DFC5FE" : "white",
                }}
                onClick={() => handleSortChange("za")}
              >
                Alphabetically: Z-A
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className={styles.items}>
        {filteredData.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
