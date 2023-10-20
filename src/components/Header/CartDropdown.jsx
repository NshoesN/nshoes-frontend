//import
import { Link } from 'react-router-dom'
//style
import '../../assets/styles/Header.scss'

function CartDropdown() {
    return (
        <div className='CartDropdown_Container'>
            <p>Your bag is empty</p>
            <ul>
                <li><Link>My Profile</Link></li>
                <li><Link>Cart</Link></li>
                <li><Link>Order</Link></li>
                <li><Link to='/SignIn'>Sign In</Link></li>
                <li><Link>Account</Link></li>
            </ul>
        </div>
    )
}
export default CartDropdown