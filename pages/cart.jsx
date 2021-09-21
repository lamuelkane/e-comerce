import Header from '../components/Header'
import Footer from '../components/Footer';
import Head from 'next/head'
import styles from '../styles/Product.module.css'
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import Cartitem from '../components/Cartitem';
import MessageBox from '../components/MessageBox';
import { useRouter } from "next/dist/client/router";

const Cart = () => {
    let {cartitems} = useContext(GlobalContext)
    const router = useRouter()

    useEffect(() => {
    }, [])

    return (
        <>
            <Head>
                <title>cart</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="./assets/images/logo.jpg" />
            </Head>
            <Header />
            <section className={``}>
                <div className={`${styles.prodjum} flex justify-center align-center`}>
                        home/cart
                </div>
            </section>
           { cartitems[0]? <section className={`bluebg padding `}>
                <div className={`w-80 margin-auto w-s-90 ${styles.cartitemswrapper}`}>
                    {
                        cartitems.map(item => (
                            <Cartitem key={item.name} cartitem={item} />
                        ))
                    }
                </div>
                <div className={`${styles.carttotalswrapper}`}>
                    <div>
                            <div className={`${styles.carttotals}`}>
                                
                                <div className={`${styles.carttotalsitem} bluebg`}>
                                    <div>Cart Subtotal :</div>
                                    <div>{`${cartitems.reduce((a, c) => a + c.amount, 0)} items: $  ${cartitems.reduce((a, c) => a + c.price * c.amount, 0).toFixed(2)}`}</div>
                                </div>
                                <div className={`${styles.carttotalsitem} bluebg`}>
                                    <div>Shipping Total :	</div>
                                    <div>${cartitems.reduce((a, c) => a + c.price * c.amount, 0) * 20/100}</div>
                                </div>    
                                <div className={`${styles.carttotalsitem} bluebg`}>
                                    <div>Total :</div>
                                    <div>${(cartitems.reduce((a, c) => a + c.price * c.amount, 0) + (cartitems.reduce((a, c) => a + c.price * c.amount, 0) * 20/100)).toFixed(2)}</div>
                                </div>
                            </div>
                            <button className={`${styles.carttotalsbtn} bluebg pointer`} onClick={e => router.push('/shippingaddress')}>PROCEED TO CHECKOUT</button>
                        </div>
                </div>
            </section > : <div className="margin-bottom-100">
                
                            <div className="w-80 margin-auto margin-bottom-100">
                                <MessageBox type='info' message='Cartb is empty Go shopping' />
                            </div> 
                        </div> 
            }
          
           <Footer />
        </>
    );
}

export default Cart;