import React, {useEffect, useState} from "react";
import TableCell from "@mui/material/TableCell";

const ProductStatus = (params) => {
  const [data, setData] = useState({color: "red", status: ""});
  const [status, setStatus] = useState([{
        status: "USER_CONFIRMED",
        color: "blue",
    text: "Chờ admin phê duyệt"
      },
        {status:"NEW",color: "purple",text:"Chờ admin xác nhận"},
        {status:"DONE",color: "green",text:"Đã xong"},
        {status:"CANCELLED",color: "red",text:"Đã hủy"},
        {status:"PAID",color: "orange",text:"Đang thuê"},
        {status:"EXTEND",color: "blue",text:"Gia hạn"},
      ]
  );


  const setProductStatus = (s) => {
    status.some(item => item.status ===s ? setData(item) : null)
    }


  useEffect(() => {
    setProductStatus(params.status)
  }, [params.status])

  return (
        <span style={{color: data.color, fontWeight: '600',textAlign: 'center'}}>
          {data.text}
          </span>
  )

}


export default ProductStatus