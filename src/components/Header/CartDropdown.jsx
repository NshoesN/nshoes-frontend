//import
import { Link } from 'react-router-dom'
//style
import '../../assets/styles/Header.scss'

function CartDropdown(props) {
    return (
        <div className='CartDropdown_Container'>
            <p>Your bag is empty</p>
            <ul>
                <li onClick={() => props.toggle()}><Link>My Profile</Link></li>
                <li onClick={() => props.toggle()}><Link>Cart</Link></li>
                <li onClick={() => props.toggle()}><Link>Order</Link></li>
                <li onClick={() => props.toggle()}><Link to='/SignIn'>Sign In</Link></li>
                <li onClick={() => props.toggle()}><Link>Account</Link></li>
            </ul>
        </div>
    )
}
export default CartDropdown