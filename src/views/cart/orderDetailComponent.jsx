import './OrderDetailComponent.css';
import Countdown, { zeroPad } from 'react-countdown';
import { useEffect, useState } from "react";

function OrderDetailComponent(props) {

  const { orderDetail } = props;
  const renderer = ({ hours, minutes, completed }) => {
    if (completed) {
      // Render a completed state
      return <div>Đã hết hạn</div>;
    } else {
      // Render a countdown
      return <span className="detail-time">{zeroPad(hours)}:{zeroPad(minutes)}</span>;
    }
  };


  return (
    <div className="wrapper-detail">
      <div className="detail-name">Tên: {orderDetail.product.name}</div>
      <div className="detail-price">Tổng :{orderDetail.product.price}</div>
      <div className="detail-month"> {orderDetail.month}</div>
      <Countdown
        date={orderDetail.expiredDate}
        renderer={renderer}
      ></Countdown>
    </div>
  )
}


export default OrderDetailComponent;