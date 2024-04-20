import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { Button } from "../styles/Button";
import { toast } from "react-hot-toast";
import styled from "styled-components";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, [auth]);

  // Fetch client token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <div className="title">
          <h1 className="greeting">
            Hello {auth?.token && auth?.user?.name}👋🏻
          </h1>
          <h2>
            {cart?.length
              ? `You have ${cart.length} items in your cart`
              : "Your cart is empty"}
            {auth?.token ? "" : " Please login to check out"}
          </h2>
        </div>
        <Content>
          <ItemsContainer>
            {cart?.map((p) => (
              <CartItem key={p._id}>
                <div className="image">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>
                <div className="details">
                  <p className="name">{p.name}</p>
                  <p className="description">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="price">Price: {p.price}</p>
                  <button onClick={() => removeCartItem(p._id)}>Remove</button>
                </div>
              </CartItem>
            ))}
          </ItemsContainer>
          <SummaryContainer>
            <h2>Cart Summary</h2>
            <hr />
            <h3>Total: {totalPrice()}</h3>
            <div className="address">
              {auth?.user?.address ? (
                <>
                  <h4>Current Address</h4>
                  <p>{auth?.user?.address}</p>
                  <button onClick={() => navigate("/dashboard/user/profile")}>
                    Update Address
                  </button>
                </>
              ) : (
                <>
                  {auth?.token ? (
                    <button onClick={() => navigate("/dashboard/user/profile")}>
                      Update Address
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </>
              )}
            </div>
            <DropInContainer>
              {!clientToken || !cart?.length ? (
                " "
              ) : (
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: { flow: "vault" },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
              )}
              <Button
                onClick={handlePayment}
                disabled={!loading || !instance || !auth?.user?.address}
              >
                {loading ? "Processing..." : "Make Payment"}
              </Button>
            </DropInContainer>
          </SummaryContainer>
        </Content>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  .greeting {
    font-size: 2rem;
    text-transform: capitalize;
  }
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemsContainer = styled.div`
  flex: 1;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 10px;
  .image {
    margin-right: 20px;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
  .details {
    flex: 1;
    .name {
      font-weight: bold;
    }
    .description {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .price {
      font-size: 16px;
    }
    button {
      padding: 5px 10px;
      background-color: red;
      color: white;
      border: none;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: darkred;
      }
    }
  }
`;

const SummaryContainer = styled.div`
  flex-basis: 350px;
  padding-left: 20px;
  .address {
    margin-bottom: 20px;
    button {
      padding: 5px 10px;
      background-color: orange;
      color: white;
      border: none;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: darkorange;
      }
    }
  }
`;

const DropInContainer = styled.div`
  margin-top: 20px;
`;

export default CartPage;
