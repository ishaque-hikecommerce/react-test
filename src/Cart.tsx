import { Button, List, ListItem, ListItemText, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "./slices/cartSlice";

type Product = {
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
};

type CartProps = {
  products?: Product[];
  text?: string;
  mode?: "browse" | "confirm";
};

const Cart = ({
  products = [],
  text = "Browse the items in your cart and then click Checkout",
  mode = "browse",
}: CartProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const originalTotal = products.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  );

  const discountedTotal = products.reduce((total, { price, quantity, discountPercentage }) => {
    const discountedPrice = price - (price * discountPercentage) / 100;
    return total + discountedPrice * quantity;
  }, 0);

  const handleButtonClick = () => {
    if (mode === "confirm") {
      // Confirm order and clear cart
      setOrderConfirmed(true);
      dispatch(clearCart());
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Shopping Cart</h1>
      {
        (mode == 'browse' || products.length == 0) &&
        <p>{text}</p>
      }

      {
        products.length === 0 ?
          (
            <Typography variant="body1">Your basket is empty.</Typography>
          ) :
          (
            <>
              <List>
                {
                  products.map((product, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={product.title}
                        secondary={`Quantity: ${product.quantity} — ₹${product.price} each — ${product.discountPercentage}% off`}
                      />
                    </ListItem>
                  ))
                }
              </List>

              <Typography fontWeight={'700'} variant="subtitle1" sx={{ mt: 2 }}>
                Original Total: ₹{originalTotal.toFixed(2)}
              </Typography>
              <Typography variant="h6" color="green">
                Discounted Total: ₹{discountedTotal.toFixed(2)}
              </Typography>
            </>
          )
      }

      {
        products.length > 0 &&
        <Button variant="contained" sx={{ my: 2 }} onClick={handleButtonClick} disabled={products.length === 0}>
          {mode === "browse" ? "Checkout" : "Confirm Order"}
        </Button>
      }

      {
        orderConfirmed && (
          <Alert severity="success" sx={{ mt: 2 }}>
            ✅ Order confirmed! Thank you for shopping with us.
          </Alert>
        )
      }
    </div>
  );
};

export default Cart;
