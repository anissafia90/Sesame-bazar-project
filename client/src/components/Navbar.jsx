import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser); // Get the current user from the Redux store
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <Container>
      <Wrapper>
        <Center>
          <Logo>Sesame-Bazar</Logo>
        </Center>
        <Right>
          {currentUser ? (
            <MenuItem onClick={handleLogout} style={{ cursor: "pointer" }}>
              LOGOUT
            </MenuItem>
          ) : (
            <div style={{ display: "flex", gap: 20 }}>
              <Link to="/register">REGISTER</Link>
              <Link to="/login">SIGN IN</Link>
            </div>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
