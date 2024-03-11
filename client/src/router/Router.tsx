import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../feature/home/HomePage";
import ContactPage from "../feature/contact/ContactPage";
import AboutPage from "../feature/about/AboutPage";
import Catalog from "../feature/catalog/Catalog";
import ProductDetails from "../feature/catalog/ProductDetails";


export const router = createBrowserRouter([{

        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
        ]
}]);