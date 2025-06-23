import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Divider
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./slices/cartSlice";
import { RootState } from "./store";
import Cart from "./Cart";
import { fetchProducts } from "./services/api";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  discountPercentage: number;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data } = await fetchProducts()
      setProducts(data?.products || [])
    } catch (error) {
      console.error({ error })
    }
  }

  return (
    <div>
      <Cart products={cartItems} mode="browse" />

      <Divider sx={{ mb: 2 }} />
      <h1>Products</h1>
      <Grid container spacing={2}>
        {
          products.map((product) => (
            <Grid key={product.id} sx={{ minWidth: 200 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="120"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2">₹{product.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => dispatch(addToCart(product))}>
                    Add to basket
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default ProductList;

