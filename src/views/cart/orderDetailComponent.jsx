import './OrderDetailComponent.css';
import Countdown, { zeroPad } from 'react-countdown';
import { useEffect, useState } from "react";
import Moment from 'react-moment';

function OrderDetailComponent(props) {

  const { orderDetail, time } = props;
  const renderer = ({ days, hours, minutes, completed }) => {
    if (completed) {
      // Render a completed state
      return <div>Đã hết hạn</div>;
    } else {
      // Render a countdown
      return <span className="detail-time"> {zeroPad(days) > 0 ? zeroPad(days) + ' ngày còn lại' : zeroPad(hours) + ':' + zeroPad(minutes) + 'giờ còn lại'} </span>;

    }
  };

  return (
    <div className="wrapper-detail">
      <div className="w-25">{orderDetail.product.name}</div>
      <div className="w-25">{orderDetail.product.price}</div>
      <div className="w-25"> {orderDetail.month}</div>

      {/* <Countdown
        date={orderDetail.expiredDate}
        renderer={renderer}
      ></Countdown> */}
      <div className="w-25">
        <Moment format="DD/MM/YYYY">{orderDetail.expiredDate}</Moment>
      </div>
    </div>
  )
}


export default OrderDetailComponent;