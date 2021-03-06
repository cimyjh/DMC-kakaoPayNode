import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UploadFundPage from "./views/UploadFundPage/UploadFundPage.js";
import RealEstateUploadProductPage from "./views/UploadFundPage/RealEstateUploadFundPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import DetailFundPage from "./views/DetailFundPage/DetailFundPage";
import StatementPage from "./views/StatementPage/StatementPage";
import AccountPage from "./views/AccountPage/AccountPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/fund/upload"
            component={Auth(UploadFundPage, true)}
          />
          <Route
            exact
            path="/fund/real_estate_upload"
            component={Auth(RealEstateUploadProductPage, true)}
          />
          <Route
            exact
            path="/fund/:fundId"
            component={Auth(DetailFundPage, true)}
          />
          <Route
            exact
            path="/statement"
            component={Auth(StatementPage, null)}
          />
          <Route exact path="/account" component={Auth(AccountPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
