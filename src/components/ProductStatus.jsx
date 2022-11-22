import {useEffect, useState} from "react";

const ProductStatus = (params) => {
  const [data, setData] = useState("");

  const setProductStatus = (s) =>{
    switch (s) {
      case "AVAILABLE" :
        setData("Trống")
        break;
      case "HIRING":
        setData("Đang cho thuê")
        break;
    }
  }
  useEffect(() => {
    setProductStatus(params.status)
  })

  return (<>
        {data}
      </>

  )
}


export default ProductStatus