import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuthContext";
import { CitiesProvider } from "./contexts/CitiesContext";
import ProtectedRoute from "./pages/ProtectedRoute";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Offer = lazy(() => import("./pages/Offer"));
const Auth = lazy(() => import("./pages/Auth"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CitiesProvider>
            <Suspense fallback={<SpinnerFullPage />}>
              <Toaster position="top-center" reverseOrder={false} />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/product" element={<Product />} />
                <Route path="/offers" element={<Offer />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </CitiesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
