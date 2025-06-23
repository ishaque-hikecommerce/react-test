import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Typography } from "@mui/material";
import Cart from "./Cart";

const Checkout = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [confirmed, setConfirmed] = useState(false);

    if (confirmed) {
        return <Typography variant="h5" sx={{ mt: 4 }}>✅ Order placed successfully!</Typography>;
    }

    return (
        <div>
            <Cart products={cartItems} mode="confirm" />
        </div>
    );
}

export default Checkout;
