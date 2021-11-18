import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useState, useEffect } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Route, Switch } from "react-router-dom";
import HomePage from "./../../features/Home/HomePage";
import ProductDetails from "./../../features/catalog/ProductDetails";
import AboutPage from "./../../features/about/AboutPage";
import ContactPage from "./../../features/contact/ContactPage";
import BasketPage from "./../../features/basket/BasketPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "./../errors/ServerError";
import NotFound from "./../errors/NotFound";
import CheckOutPage from "../../features/checkout/CheckOutPage";
import { getCookie } from "./../util/util";
import agent from "../api/agent";
import Loading from "./Loading";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");

    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((er) => console.log(er))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  if (loading) return <Loading message="Initialising app  .." />;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/catalog" component={Catalog} />
          <Route path="/catalog/:id" component={ProductDetails} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/server-error" component={ServerError} />
          <Route path="/basket" component={BasketPage} />
          <Route path="/checkout" component={CheckOutPage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
