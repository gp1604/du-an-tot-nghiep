import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import FormControl from '@mui/material/FormControl';
import ToggleButtonMui from '@mui/material/ToggleButton';
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { API_GET_OVERVIEW } from "utils/const";
import axios from "axios";
import { API_OVERVIEW_MONTHLY_EARNING } from "utils/const";
import { API_OVERVIEW_MONTHLY_HIRED } from "utils/const";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { API_OVERVIEW_TIME_PRODUCT_HIRED } from "utils/const";
import moment from "moment";
import styled from 'styled-components';
import { formatMoney } from 'common/formatMoney';
import { toast } from 'react-toastify';


const columns = [
  { id: 'id', label: 'Id', minWidth: 50 },
  { id: 'name', label: 'Tên trụ', align: 'center', minWidth: 160 },
  {
    id: 'description',
    label: 'Địa chỉ',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Giá',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'quantityPillar',
    label: 'Số lần được thuê',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}
const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = async (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
    if (index === 2) {
      console.log('week');
      const response = await axios.get(API_OVERVIEW_MONTHLY_EARNING + '5&type=week')
      if (response) {
        setDataMonth(response.data)
      }
    } else {
      console.log('month');
      const response = await axios.get(API_OVERVIEW_MONTHLY_EARNING + '5&type=month')
      if (response) {
        setDataMonth(response.data)
      }
    }
  };

  const [dataOverview, setDataOverview] = useState([])
  const [dataOverviewOrderEachMonth, setDataOverviewOrderEachMonth] = useState([])


  const overview = async (e) => {
    const response = await axios.get(API_GET_OVERVIEW)
    if (response) {
      setDataOverview(response.data)
    }
  }

  const dataMapEachMonth = new Map(Object.entries(dataOverviewOrderEachMonth));


  let monthEach = []
  let totalEach = []
  dataMapEachMonth.forEach(function (value, key) {
    monthEach.push(key)
  })
  dataMapEachMonth.forEach(function (value, key) {
    totalEach.push(value)
  })


  // data month earning
  const [dataMonth, setDataMonth] = useState([])
  const dataMap = new Map(Object.entries(dataMonth));

  let month = []
  let total = []
  dataMap.forEach(function (value, key) {
    month.push(key)
  })
  dataMap.forEach(function (value, key) {
    total.push(value)
  })

  const data = {
    labels: month,
    datasets: [
      {
        label: "Performance",
        data: total
      }
    ]
  };

  // const data2 = {
  //   labels: month,
  //   datasets: [
  //     {
  //       label: "Performance",
  //       data: total
  //     }
  //   ]
  // }

  //GET API TIME_PRODUCT_HIRED
  let d = new Date();
  let date2Input = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()


  const [dataTimeOverview, setDataTimeOverview] = useState([])
  const [totalHiring, setTotalHiring] = useState(0)
  const [page, setPage] = useState(0);
  const [dateAPI1, setDateAPI1] = useState(null);
  const [dateAPI2, setDateAPI2] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const handleChangePage = async (event, newPage) => {
    if (dateAPI1 == null || dateAPI2 == null) {
      const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + rowsPerPage + ' &date1=' + date2Input + '&date2=' + moment().format("DD/MM/YYYY") + '&page=' + (newPage + 1) + '&sort=desc')
      if (response) {
        setPage(newPage);
        setDataTimeOverview(response.data.map)
      }
    } else {
      const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + rowsPerPage + ' &date1=' + moment(dateAPI1).format("DD/MM/YYYY") + '&date2=' + moment(dateAPI2).format("DD/MM/YYYY") + '&page=' + (newPage + 1) + '&sort=desc')
      if (response) {
        setPage(newPage);
        setDataTimeOverview(response.data.map)
      }
    }
  };
  const handleChangeRowsPerPage = async (event) => {
    if (dateAPI1 == null || dateAPI2 == null) {
      const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + event.target.value + ' &date1=' + date2Input + '&date2=' + moment().format("DD/MM/YYYY") + '&page=' + 1 + '&sort=desc')
      if (response) {
        setDataTimeOverview(response.data.map)
        setPage(0);
        setRowsPerPage(+event.target.value);
      }

    } else {
      const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + event.target.value + ' &date1=' + moment(dateAPI1).format("DD/MM/YYYY") + '&date2=' + moment(dateAPI2).format("DD/MM/YYYY") + '&page=' + 1 + '&sort=desc')
      if (response) {
        setDataTimeOverview(response.data.map)
        setPage(0);
        setRowsPerPage(+event.target.value);
      }
    }
  };

  const timeOverview = async (e) => {
    const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + rowsPerPage + ' &date1=' + date2Input + '&date2=' + moment().format('DD/MM/YYYY') + '&page=' + page + 1 + '&sort=' + sort)
    if (response) {
      setDataTimeOverview(response.data.map)
      setTotalHiring(response.data.totalHired)
      setTotalPages(response.data.totalProduct)
    }
  }

  const [keyword, setKeyword] = useState(null);
  const submitDate = async (e) => {
    if (dateAPI1 == null) {
      toast.warning('Vui lòng chọn thời gian bắt đầu ', { autoClose: 1200 })
    } else if (dateAPI2 == null) {
      toast.warning('Vui lòng chọn thời gian kết thúc ', { autoClose: 1200 })
    }
    else if (dateAPI1 > dateAPI2) {
      toast.warning('Thời gian bắt đầu không được lớn hơn thời gian kết thúc ', { autoClose: 1200 })
    } else {
      if (keyword == null) {
        const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + rowsPerPage + ' &date1='
          + moment(dateAPI1).format("DD/MM/YYYY") + '&date2=' + moment(dateAPI2).format("DD/MM/YYYY") + '&page=' + page + 1 + '&sort=' + sort)
        if (response) {
          setDataTimeOverview(response.data.map)
          setTotalHiring(response.data.totalHired)
          setTotalPages(response.data.totalProduct)
        }
      } else {
        const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + rowsPerPage + ' &date1='
          + moment(dateAPI1).format("DD/MM/YYYY") + '&date2=' + moment(dateAPI2).format("DD/MM/YYYY") + '&page=' + page + 1 + '&sort=' + sort + '&keyword=' + keyword)
        if (response) {
          setDataTimeOverview(response.data.map)
          setTotalHiring(response.data.totalHired)
          setTotalPages(response.data.totalProduct)
        }
      }
    }
  }

  const [sort, setSort] = useState('desc');
  const onChangeButtonSort = async (e) => {
    if (selected === false) {
      setSort('asc')
    } else setSort('desc')

    if (dateAPI1 == null || dateAPI2 == null) {
      const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + rowsPerPage + ' &date1='
        + date2Input + '&date2=' + moment().format("DD/MM/YYYY") + '&page=' + page + 1 + '&sort=' + sort)
      if (response) {
        setDataTimeOverview(response.data.map)
        setTotalHiring(response.data.totalHired)
        setTotalPages(response.data.totalProduct)
      }
    } else {
      if (keyword == null) {
        const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + rowsPerPage + ' &date1='
          + moment(dateAPI1).format("DD/MM/YYYY") + '&date2=' + moment(dateAPI2).format("DD/MM/YYYY") + '&page=' + page + 1 + '&sort=' + sort)
        if (response) {
          setDataTimeOverview(response.data.map)
          setTotalHiring(response.data.totalHired)
          setTotalPages(response.data.totalProduct)
        }
      } else {
        const response = await axios.get(API_OVERVIEW_TIME_PRODUCT_HIRED + '?dataPerPage=' + rowsPerPage + ' &date1='
          + moment(dateAPI1).format("DD/MM/YYYY") + '&date2=' + moment(dateAPI2).format("DD/MM/YYYY") + '&page=' + page + 1 + '&sort=' + sort + '&keyword=' + keyword)
        if (response) {
          setDataTimeOverview(response.data.map)
          setTotalHiring(response.data.totalHired)
          setTotalPages(response.data.totalProduct)
        }
      }
    }
  }

  const [selected, setSelected] = useState(false);
  const ToggleButton = styled(ToggleButtonMui)({
  });
  const arr = []
  const arr2 = []
  const dataArr = []

  const obj = Object.entries(dataTimeOverview)
  obj.forEach(function (value, key) {
    arr.push(value)
  })

  const obj2 = Object.entries(arr)
  obj2.forEach(function (value, key) {
    arr2.push(value[1])
  })
  arr2.forEach(function (value, key) {
    dataArr.push(JSON.parse(value[0]))
  })


  useEffect(() => {
    overview()
    const onchangeHired = async (e) => {
      const response = await axios.get(API_OVERVIEW_MONTHLY_HIRED + '&sort=' + sort)
      if (response) {
        setDataOverviewOrderEachMonth(response.data)
      }
    }
    const overviewMonth = async (e) => {
      const response = await axios.get(API_OVERVIEW_MONTHLY_EARNING + '&type=month')
      if (response) {
        setDataMonth(response.data)
      }
    }
    overviewMonth()
    onchangeHired()
    timeOverview()
  }, [])
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mb-4">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Thu nhập
                    </h6>
                    <h2 className="text-white mb-0">Thu nhập {new Date().getFullYear()}{" "}</h2>
                  </div>
                  <p className="mt-3">
                    <NavLink>
                      <span className="d-none d-md-block">  </span>
                    </NavLink>
                  </p>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1
                          })}
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Tháng</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2
                          })}
                          data-toggle="tab"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Tuần</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={data}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card style={{ height: '100%' }} className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Số trụ được thuê hàng tháng
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={{
                      labels: monthEach,
                      datasets: [
                        {
                          label: "Thu nhâp",
                          data: totalEach,
                          maxBarThickness: 10
                        }
                      ]
                    }}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5 mb-4">
          <Col className="mb-5 mb-xl-0" style={{ width: '100%' }}>
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <span className="mb-0 mr-3" style={{ color: 'black', fontWeight: '600' }}>Các trụ được thuê từ thời gian từ:</span>
                    <input name="date1" style={{ padding: "5px 10px", borderRadius: "8px" }} className="mr-3" id='date1' onChange={e => setDateAPI1(e.target.value)} type="date" />
                    <span className="mb-0 mr-3" style={{ color: 'black', fontWeight: '600' }}>đến</span>
                    <input style={{ padding: "5px 10px", borderRadius: "8px" }} className="mr-3" id='date2' onChange={e => setDateAPI2(e.target.value)} type="date" />
                    <input style={{ padding: "5px 10px", borderRadius: "8px" }} className="mr-3" placeholder='Tìm theo địa chỉ' onChange={e => setKeyword(e.target.value)} type="text" />

                    <FormControl sx={{ backgroundColor: 'white', height: '45px', borderRadius: '5px' }} size="small">
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ToggleButton
                          sx={{ height: '83%' }}
                          value="check"
                          selected={selected}
                          onChange={() => {
                            setSelected(!selected);
                            onChangeButtonSort()
                          }}
                        >
                          {selected ? <NorthIcon /> : <SouthIcon />}
                        </ToggleButton>
                      </div>
                    </FormControl>
                    <Button
                      color="primary"
                      onClick={submitDate}
                      size="s"
                      style={{ marginLeft: '20px', padding: '10px 20px' }}
                    >
                      Tìm kiếm
                    </Button>
                  </div>

                </Row>
              </CardHeader>
              <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(arr2)
                      .map(([key, value]) => {
                        return (
                          <TableRow hover role="checkbox" key={key}>
                            <TableCell style={{ textAlign: 'left' }}>{JSON.parse(value[0]).id}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{JSON.parse(value[0]).name}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{JSON.parse(value[0]).street}</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{formatMoney(JSON.parse(value[0]).price)} VNĐ</TableCell>
                            <TableCell style={{ textAlign: 'center' }}>{JSON.parse(value[1])}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={totalPages}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
