import './OrderComponent.css';
import { useEffect, useState } from "react";
import OrderDetailComponent from "./orderDetailComponent";
import Moment from 'react-moment';
import { formatMoney } from 'common/formatMoney';
import OrderStatus from "../../components/OrderStatus";

function Order({ order, ya, updatingComponent }) {

  const [isExpanded, setIsExpanded] = useState(true);
  const [listIds, setListIds] = useState([]);




  let checkIdHasBeen = true

  const expandOrder = () => {
    setIsExpanded(!isExpanded);
  }





  let idOrderInURL = window.location.pathname.replace(/\D/g, "");

  useEffect(() => {
    updatingComponent(idOrderInURL)
  }, [idOrderInURL]);

  return (
    <div className="wrapper">
      <div className={`${order.status}`} >

        <div onClick={() => expandOrder()}>

          <div className="row">
            <div className="col" style={{ width: '100%' }}>
              <ul className="list-group shadow">

                <li style={{ padding: '0' }} className="list-group-item">
                  <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div className="media-body order-2 order-lg-1">
                      <h5 className="mt-0 font-weight-bold mb-2 h4"> Thời gian đặt:
                        <Moment format="DD/MM/YYYY">
                          {order.orderTime}
                        </Moment> </h5>
                      <p className="font-italic text-muted mb-0 small">Tổng cộng : {formatMoney(order.total)} VNĐ</p>
                      <div className="d-flex align-items-center mt-1">
                        <h6 className="font-weight-bold my-2 h5">Số lượng : {order.quantity}</h6>
                        <h6 className="font-weight-bold my-2 ml-8 h5">Trạng thái : <OrderStatus status={order.status} /></h6>


                      </div>
                    </div>
                  </div>
                  {/*<div style={{ textAlign: 'right' }} className='mr-2'>*/}
                  {/*  <Moment fromNow>{order.orderTime}</Moment>*/}
                  {/*</div>*/}
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

        <div   className="wrapper-detail wrapper-detail-parent">
        <div className="w-25">Tên trụ</div>

          <div className="w-25">Giá tiền</div>
          <div className="w-25"> Số tháng</div>
          <div className="w-25"> Ngày hết hạn</div>

        </div>
        {order.orderDetail?.map((orderDetail) => (
          <OrderDetailComponent
            orderDetail={orderDetail}
            time={order.orderTime}
          />
        ))}
      </div>
    </div>
  )
}
export default Order;
