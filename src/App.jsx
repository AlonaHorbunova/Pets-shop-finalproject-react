import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import MainPage from "./pages/main/index.jsx";
import CategoriesPage from "./pages/catigories/index.jsx";
import ProductsPage from "./pages/products/index.jsx";
import SalesPage from "./pages/sales/index.jsx";
import BasketPage from "./pages/basket/index.jsx";
import NotFoundPage from "./pages/notFoundPage/index.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
