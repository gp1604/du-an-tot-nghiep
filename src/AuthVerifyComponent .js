import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

const AuthVerifyComponent = ({ history }) => {
    history.listen(() => {
        if (localStorage.getItem("token")) {
            const jwt_Token_decoded = jwt_decode(localStorage.getItem("token"));
            if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                localStorage.clear()
                toast.warning('Phiên đăng nhập đã hết hạn ', { autoClose: 1200 })
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }
    });
    return <div></div>;
};

export default withRouter(AuthVerifyComponent);