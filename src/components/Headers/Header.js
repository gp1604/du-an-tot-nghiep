import axios from "axios";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardTitle, Container, Row, Col, Nav } from "reactstrap";
import { API_GET_OVERVIEW } from "utils/const";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import TodayIcon from '@mui/icons-material/Today';
import InsightsIcon from '@mui/icons-material/Insights';

const Header = () => {
  const [dataOverview, setDataOverview] = useState([])
  useEffect(() => {
    overview()
  }, [])

  const overview = async (e) => {
    const response = await axios.get(API_GET_OVERVIEW)
    if (response) {
      setDataOverview(response.data)
    }
  }
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card style={{ height: '17vh' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Số lượng trụ
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {dataOverview.totalProduct}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <NavLink to={'/admin/product'} className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </NavLink>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-1">
                        <i className="fa fa-arrow-up" /> to
                      </span>{" "}
                      <span className="text-nowrap"> {new Date().getDate()}{"/"}{new Date().getMonth() + 1}{"/"}{new Date().getFullYear()}{""}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card style={{ height: '17vh' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Số trụ đã thuê
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{dataOverview.totalHiring}</span>
                      </div>
                      <Col className="col-auto">
                        <NavLink to={'/admin/hiringPillar'} className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </NavLink>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Tổng số trụ đã thuê: </span>

                      <span className="text-success mr-1">
                        {/* <i className="fa fa-arrow-up mr-1" /> */}
                        {dataOverview.totalHiring}/{dataOverview.totalProduct}

                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card style={{ height: '17vh' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Số trụ chưa thuê
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{dataOverview.totalAvailable}</span>
                      </div>
                      <Col className="col-auto">
                        <NavLink to={'/admin/availablePillar'} className="icon icon-shape bg-info text-white rounded-circle shadow">
                          {/* <i className="fas fa-percent" /> */}
                         <InsightsIcon/>

                        </NavLink>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">Tổng số trụ chưa thuê: </span>

                      <span className="text-success mr-1">
                        {/* <i className="fa fa-arrow-up mr-1" /> */}
                        {dataOverview.totalAvailable}/{dataOverview.totalProduct}

                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card style={{ height: '17vh' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Số lượng khách
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{dataOverview.totalUser}</span>
                      </div>
                      <Col className="col-auto">
                        <NavLink to={'/admin/customers'} className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </NavLink>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success">
                        <i className="fas fa-arrow-up" /> {dataOverview.totalUserHiring}
                      </span>{" "}
                      <span className="text-nowrap"> người dùng đang thuê trụ</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>

          <div className="header-body mt-4">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card style={{ height: '17vh' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tổng doanh thu
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          <CurrencyFormat value={dataOverview.totalEarning} displayType={'text'} thousandSeparator={true} />
                        </span>
                      </div>
                      <Col className="col-auto">
                        <p className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="ni ni-money-coins" />
                        </p>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-1">
                        <i className="fa fa-arrow-up mr-1" /> to
                      </span>{" "}
                      <span className="text-nowrap"> {new Date().getDate()}{"/"}{new Date().getMonth() + 1}{"/"}{new Date().getFullYear()}{""}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3" >
                <Card style={{ height: '17vh' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Doanh thu hôm nay
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {/* <i className="fa fa-arrow-up" />    */}
                          <CurrencyFormat value={dataOverview.totalEarningToday} displayType={'text'} suffix={' VNĐ'} thousandSeparator={true} />
                        </span>
                      </div>
                      <Col className="col-auto">
                        <p className="icon icon-shape bg-green text-white rounded-circle shadow">
                          <TodayIcon/>
                        </p>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-1">
                        {/* <i className="fa fa-arrow-up" />  */}
                      </span>{" "}
                      <span className="text-nowrap"> {new Date().getDate()}{"/"}{new Date().getMonth() + 1}{"/"}{new Date().getFullYear()}{""}</span>
                    </p>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-1">
                        <i className="fa fa-arrow-up mr-1" />
                        <CurrencyFormat value={dataOverview.totalEarning} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} />
                      </span>{" "}
                      <span className="text-nowrap"></span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card style={{ height: '17vh' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Số người dùng đang thuê trụ
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{dataOverview.totalUserHiring}</span>
                      </div>
                      <Col className="col-auto">
                        <p className="icon icon-shape bg-pink text-white rounded-circle shadow">
                          <OnlinePredictionIcon/>
                        </p>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-1">
                        <i className="fa fa-arrow-up mr-1" /> to
                      </span>{" "}
                      <span className="text-nowrap"> {new Date().getDate()}{"/"}{new Date().getMonth() + 1}{"/"}{new Date().getFullYear()}{""}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card style={{ height: '17vh' }} className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Số lượng khách truy cập website
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">Coming soon</span>
                      </div>
                      <Col className="col-auto">
                        <p className="icon icon-shape bg-cyan text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </p>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-1">
                        <i className="fa fa-arrow-up mr-1" /> to
                      </span>{" "}
                      <span className="text-nowrap"> {new Date().getDate()}{"/"}{new Date().getMonth() + 1}{"/"}{new Date().getFullYear()}{""}</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div >
    </>
  );
};

export default Header;
