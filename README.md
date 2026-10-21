# 🛍️ BuyBusy — E-Commerce Web Application

BuyBusy is a frontend e-commerce demo built with React that demonstrates a complete shopping experience in a single-page application. Users can browse products, search and filter the catalog, authenticate, manage their shopping cart, place orders, and view their order history.

The project focuses on practical frontend engineering concepts, including **Redux Toolkit state management, React Router navigation, Firebase Firestore integration, and reusable UI components**.

## ✨ Features

### 🛒 Product Catalog
- Browse a collection of products.
- Search products by text.
- Filter products by category and price.
- View product listings through a responsive interface.

### 🔐 User Authentication
- Dedicated Sign In and Sign Up pages.
- Manage authentication state using Redux.
- Restore login state using locally stored user information.

### 🛍️ Shopping Cart
- Add products to the cart.
- Remove products from the cart.
- Increase or decrease product quantities.
- Calculate the total item count and cart value.
- Display an empty-cart animation when no items are present.

### 📦 Order Management
- Purchase all items in the cart.
- Save order information to Firebase Firestore.
- View previous purchases on the **My Orders** page.

### 🔥 Firebase Integration
- Initialize Firebase through `src/firebaseInit.js`.
- Integrate Cloud Firestore for data persistence.
- Store user-related order and cart data using the application's Firestore structure.

### 🎨 User Experience
- Toast notifications using `react-toastify`.
- Loading states for asynchronous operations.
- CSS Modules for component-level styling.
- Lottie animations for an enhanced shopping experience.
- Integrated navbar and product search functionality.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript | Application logic |
| HTML5 | Application structure |
| CSS3 | Styling and layouts |
| React 18 | UI development |
| Create React App | Development environment |
| Redux Toolkit | Centralized state management |
| React Redux | Connecting React components to Redux |
| React Router DOM | Client-side routing |
| Firebase Firestore | Data persistence |
| React Toastify | Toast notifications |
| Lottie | Animations |

## 🚀 Getting Started

Follow these steps to run BuyBusy locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/BhavyaLuthra18/BuyBusy.git
```

### 2. Navigate to the Project Directory

```bash
cd BuyBusy
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm start
```

The application will run at:

**http://localhost:3000**

The development server supports hot reloading, allowing changes to appear in the browser as you edit the code.

## 🗂️ Project Structure

```text
BuyBusy/
├── public/
├── src/
│   ├── Assets/
│   │   └── data.js
│   ├── firebaseInit.js
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

*Note: The directory names above illustrate the intended organization. Adjust them to match the actual folders and files in your repository.*

## 🧠 Key Concepts Demonstrated

- **Component-based architecture:** Build reusable UI components with React.
- **Global state management:** Manage authentication and cart state using Redux Toolkit.
- **Client-side routing:** Navigate between pages without full-page reloads using React Router.
- **Asynchronous data flow:** Handle data operations involving Firebase Firestore.
- **Persistent application data:** Integrate frontend state with a cloud database.
- **Conditional rendering:** Display loading states, empty-cart screens, and user-specific content.
- **User interaction:** Implement search, filters, quantity controls, and checkout actions.

## 🔥 Firebase Configuration

The application initializes Firebase and Firestore through `src/firebaseInit.js`.

To run the application with your own Firebase project:

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Register a web application.
3. Configure Firebase Authentication if required by your implementation.
4. Create a Cloud Firestore database.
5. Update the Firebase configuration in the application.
6. Ensure the required Firestore security rules allow only authorized operations.

**Security note:** Never expose Firebase Admin credentials or service account private keys in frontend code. Restrict database access with appropriate Firestore security rules.

## 🎯 Project Goals

BuyBusy was built to demonstrate how frontend technologies work together to create an interactive e-commerce application.

The project explores:

- Managing complex UI state with Redux Toolkit.
- Structuring a multi-page React application.
- Synchronizing application data with Firebase.
- Implementing a shopping cart and order workflow.
- Building a user-friendly interface with reusable components.

## 👩‍💻 Author

**Bhavya Luthra**

- GitHub: [@BhavyaLuthra18](https://github.com/BhavyaLuthra18)
- Project Repository: [BuyBusy](https://github.com/BhavyaLuthra18/BuyBusy)

---

⭐ If you find this project useful for learning React, Redux Toolkit, and Firebase integration, consider giving the repository a star!
