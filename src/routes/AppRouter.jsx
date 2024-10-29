import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../Pages/Landing/Landing";
import Auth from "../Pages/Auth/Auth";
import Payment from "../Pages/Payment/Payment";
import Cart from "../Pages/Cart/Cart";
import Orders from "../Pages/Orders/Orders";
import Results from "../Pages/Results/Results";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import Product from "../components/Product/Product";

//for stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

//provide public key and load it to stirpe

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe(
  "pk_test_51QCaRnLDVVOCwSc2FuDVQi42K4OkkSzkcM1cpoQr1fWxcku0qckSnKLbxmO3fXUFtHHbcFOnwmAfLPbizCyO940O00uk12Ue5u"
);

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/payments"
          element={
            // wrap payment component by Element from stripe and provide stripe prop with a value of stripePromise and hold that in protectedRoute
            <ProtectedRoute
              msg={
                "Please sign in to complete your payment. (You'll be redirected to the checkout page)"
              }
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"Please sign in to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/products" element={<Product />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
