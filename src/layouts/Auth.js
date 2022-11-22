
import React from "react";
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import './css.css'
// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import jwt_decode from "jwt-decode";
import routes from "routes.js";

const Auth = (props) => {

  const history = useHistory();
  let decoded;
  let token = localStorage.getItem("token");
  if (token !== null) {
    decoded = jwt_decode(token);
  }
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      console.log(window.location.pathname);
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else if (decoded === undefined && !decoded && history.location.pathname === '/auth/profile') {
        history.push('/auth/homePage')
        history.block(true)
      }
      else if (decoded === undefined && !decoded && history.location.pathname === '/auth/activity') {
        history.push('/auth/homePage')
        history.block(true)
      } else if (prop.layout === "") {
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}  >
        <AuthNavbar />
        <div className="header py-7 py-lg-7 mt-4">
          {/* bg-gradient-info */}
          {/* <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div> */}
        </div>

        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/auth/pageNotFound" />
            </Switch>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;


