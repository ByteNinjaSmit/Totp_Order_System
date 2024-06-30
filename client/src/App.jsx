import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Navbar1 from "./components/Navbar";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import {Logout} from "./pages/Logout";
import "./App.css";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";
import AdminTotp from "./pages/Admin-Totp"; // Note the use of default import
import { TotpVerify } from "./pages/Totp-Verify";
import { AdminOrders } from "./pages/Admin-Orders";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Navbar1 />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/service" element={<Service />} />
            <Route exact path="/service/:id/totp" element={<TotpVerify />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="users/:id/edit" element={<AdminUpdate />} />
              <Route path="totp/:id" element={<AdminTotp />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
