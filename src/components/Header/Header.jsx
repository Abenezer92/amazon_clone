import { useContext } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import amazon_letter_logo from "../../assets/images/logo/amazon_letter_white_logo.png";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type";
import LowerHeader from './LowerHeader'
const Header = () => {

  const [{ user, basket },dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  //handle sign out and clear cart at the same time when the user clicks signout button
  const handleSignOutAndClearCart = () => {
    if (user) {
      dispatch({ type: Type.EMPTY_BASKET });// to clear the cart
      auth.signOut(); // Sign the user out
    }
};

  return (
    <section className={styles.fixed}>
      <section>
        <div className={styles.header__container}>
          {/* logo section */}
          <div className={styles.logo__container}>
            <Link to="/">
              <img src={amazon_letter_logo} alt="amazon logo" />
            </Link>
            <div className={styles.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search section */}
          <div className={styles.search}>
            <select name="" id="">
              <option value="">All</option>
              <option value="">Art and crafts</option>
              <option value="">Automotive</option>
              <option value="">Books</option>
              <option value="">Electronics</option>
              <option value="">Software</option>
              <option value="">Baby</option>
            </select>
            <input type="text" />
            <BsSearch size={42} />
          </div>
          {/* other section */}
          <div className={styles.order__container}>
            <Link to="/" className={styles.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt=""
              />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to={!user && "/auth"}>
              {/* <Link to={!user && "/auth/signIn"}> */}
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={handleSignOutAndClearCart}>
                      Sign Out
                    </span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={styles.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader/>
    </section>
  );
};

export default Header;
