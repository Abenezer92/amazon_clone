import React, { useContext, useState, useEffect } from "react";
import Layout from '../../components/Layout/Layout'
import classes from "./orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { BiLoader } from "react-icons/bi";
import moment  from 'moment';


function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
      .doc(user.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,            // Fetch the document ID correctly
            created: doc.data().created,  // Fetch the 'created' field from the document's data
            amount: doc.data().amount,    // Fetch the 'amount' field (as you are logging)
            data: doc.data(),      // Optional: include the whole document's data
          }))
        );
      });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2 style={{margin:"20px"}}>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <div style={{display:"flex", flexWrap:"wrap",fontWeight:"500", borderBottom:"1px solid black"}}>
                  <p>Order ID: <span style={{color:"var(--primary-shade)"}}>{eachOrder?.id}</span></p>
                  <p>Total Amount: <span style={{color:"var(--primary-shade)"}}>${eachOrder?.amount.toLocaleString()}</span></p>
                  <p>Purchased Date: <span style={{color:"var(--primary-shade)"}}>{moment(eachOrder?.created * 1000).format('dddd, MMM DD, YYYY h:mm A')}</span></p>
                  </div>

                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} itemAmount={order.amount} total={true} key={order.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;