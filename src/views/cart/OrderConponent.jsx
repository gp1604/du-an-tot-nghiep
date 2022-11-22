import './OrderComponent.css';
import { useEffect, useState } from "react";
import OrderDetailComponent from "./orderDetailComponent";
import Moment from 'react-moment';
import { formatMoney } from 'common/formatMoney';

function Order({ order, isExtended, ya, dataBack }) {

  const [isExpanded, setIsExpanded] = useState(true);
  const [childData, setChildData] = useState({});
  const [listIds, setListIds] = useState([]);




  let checkIdHasBeen = true

  const expandOrder = () => {
    setIsExpanded(!isExpanded);
  }

  const getCheckIds = (data) => {
    if (data.isChecked) {
      // eslint-disable-next-line array-callback-return
      listIds.map((item => {
        if (item.productId === data.id) {
          checkIdHasBeen = false
        }
      }))

      if (checkIdHasBeen === true) {
        setListIds([...listIds, {
          productId: data.id,
          month: Number(data.month)
        }]);
      }
    }
    else {
      listIds.splice(listIds.indexOf(data.id), 1)
    }
  }
  console.log(childData);



  let idOrderInURL = window.location.pathname.replace(/\D/g, "");


  return (
    <div className="wrapper">
      <button style={{ display: order.id === parseInt(idOrderInURL) ? "none" : "block" }}>chi tiet {order.id}</button>
      <div className={`${order.status}`} >

        <div onClick={() => expandOrder()}>

          <div class="row">
            <div class="col" style={{ width: '100%' }}>
              <ul class="list-group shadow">

                <li style={{ padding: '0' }} class="list-group-item">
                  <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                      <h5 class="mt-0 font-weight-bold mb-2"> Thời gian đặt:
                        <Moment format="DD/MM/YYYY">
                          {order.orderTime}
                        </Moment> </h5>
                      <p class="font-italic text-muted mb-0 small">Tổng cộng : {formatMoney(order.total)} VNĐ</p>
                      <div class="d-flex align-items-center mt-1">
                        <h6 class="font-weight-bold my-2">Số lượng : {order.quantity}</h6>
                        <h6 class="font-weight-bold my-2 ml-8">Trạng thái : {order.status}</h6>

                        {/* <ul class="list-inline small">
                          <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                          <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                          <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                          <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                          <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
                        </ul> */}
                      </div>
                    </div>
                    {/* <img src="https://i.imgur.com/6IUbEME.jpg" alt="Generic placeholder image" width="200" class="ml-lg-5 order-1 order-lg-2" /> */}
                  </div>
                  <div style={{ textAlign: 'right' }} className='mr-2'>
                    <Moment fromNow>{order.orderTime}</Moment>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <div style={{
        display: ya === undefined || ya === null ? "block" :
          isExpanded ? "none" : "block"
      }}>

        {order.orderDetail?.map((orderDetail) => (
          <OrderDetailComponent
            orderDetail={orderDetail}
          />
        ))}
      </div>
    </div>
  )
}
export default Order;
