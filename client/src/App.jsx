import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import RouletteWheel from "./components/RouletteWheel";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import Modal from "./components/Modal"; // Assume you have a Modal component

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [showRoulette, setShowRoulette] = useState(true);

  const handleSpinComplete = (prize) => {
    setShowRoulette(false);
    alert(`Congratulations! You won: ${prize}`);
  };

  return (
    <>
      {showRoulette && (
        <Modal onClose={() => setShowRoulette(false)}>
          <h1>Spin to Win Exclusive Discounts!</h1>
          <p>
            Try your luck and win exciting discounts on our products. Spin the
            wheel to see what you win!
          </p>
          <RouletteWheel onComplete={handleSpinComplete} />
        </Modal>
      )}

      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/:category">
            <ProductList />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
