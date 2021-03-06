import Head from 'next/head'
import Cartpaymentitem from '../components/Cartpaymentitem';
import styles from '../styles/Product.module.css'
import Header from '../components/Header'
import { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/Globalcontext";
import { useRouter } from "next/dist/client/router";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios'
import {Notification} from '../components/Notification'


const Payment = () => {
    let {cartitems, products, sever} = useContext(GlobalContext)
    const router = useRouter()
    let  shipping = useRef()
    const [shippingaddress, setshippingaddress] = useState([])
    const [ paymentmethod, setpaymentmethod] = useState('paypal')
    
    const makeorder = async () => {
        const order = {
            cartItems: cartitems,
            shippingDetails: shippingaddress,
            paymentmethod: paymentmethod
        }

        const productsorderd = []

        cartitems.map(item => {
            let product =  products.find(prod => prod._id === item.id)
            product.lastlyOrdered = new Date()
            product.numOrders ++
            productsorderd.push(product)
        })
        const {data} = await axios.post(`${sever}/order/getorder`, order)
        const {data: res} = await axios.post(`${sever}/api/products/updateproducts`, productsorderd)
        Notification({
            title:"ORDER SUCCESS",
            message:`Sucessfuly ordered products, you will receive an email from one of our support team members instructing you hoe to proceed with payment`,
            type:"success",
            container:"top-right",
            insert:"top",
            animationIn:"fadeInUp",
            animationOut:"fadeOut",
            duration:10000
          })
        localStorage.removeItem('cartitems')
        router.push('/')
    }

    useEffect(() => {
        setshippingaddress(JSON.parse(localStorage.getItem('address')))
        if(!JSON.parse(localStorage.getItem('address')) || !cartitems[0]) router.push('/shippingaddress')
    }, [])

    return (
        <>
            <Head>
                <title>payment</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="./assets/images/logo.jpg" />
            </Head>
            <Header />
            <div className={`${styles.prodjum} curly xx-large flex justify-center align-center`}>
                        Payment
            </div>
            <div >
                <div className={`bluebg padding flex wrap justify-around`}>
                <div className={`${styles.carttotalswrapper} margin-bottom`}>
                    <div>
                            <div className={`${styles.carttotals}`}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">PAYMENT METHOD</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={paymentmethod} onChange={e => setpaymentmethod(e.target.value)}>
                                    <FormControlLabel value="paypal" control={<Radio />} label="paypal" />
                                    <FormControlLabel value="Bitcoin" control={<Radio />} label="Bitcoin" />
                                    <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" />
                                </RadioGroup>
                            </FormControl>
                            </div>
                        </div>
                </div>

                <div className="w-50 w-s-90 margin-auto">
                    <div className="products-container">
                    <h2 className="center">Order Preview</h2>
                    <p className="center">just a preview of your order</p>
                    <p>Your Order </p>
                    <div className="cartItems"> 
                        {
                            cartitems.map(item => <Cartpaymentitem key={item.name} item={item} />)
                        }
                       
                    </div>
                    <hr></hr>
                    <div className="section-divider-center">
                        <div>
                            <h3>Shipping Address</h3>
                            <p><b>Country</b>: {shippingaddress?.country}</p>
                            <p><b>City</b>: {shippingaddress?.city}</p>
                            <p><b>Address</b>:  {shippingaddress?.address}</p> 
                            <p><b>Zip</b>:  {shippingaddress?.zip}</p>
                            <p><b>Name</b>:  {shippingaddress?.name}</p>
                            <p><b>Contact</b>: {shippingaddress?.phonenumber}</p>
                        </div>
                        <div>
                            <h3>Details</h3>
                            <p><b>Subtotal</b>: <span>${cartitems.reduce((a, c) => a + c.price * c.amount, 0).toFixed(2)}</span></p>
                            <p><b>Standard Shipping</b>: <span>${cartitems.reduce((a, c) => a + c.price * c.amount, 0) * 20/100}</span></p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="section-divider">
                        <div>
                            <p>Order Total</p>
                            <h3><span> ${(cartitems.reduce((a, c) => a + c.price * c.amount, 0) + (cartitems.reduce((a, c) => a + c.price * c.amount, 0) * 20/100)).toFixed(2)}</span></h3>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="section-divider">
                        <div>
                            <h3><small>Payment With    </small><span>{paymentmethod}</span></h3>
                        </div>
                    </div>
                </div>
                <button className={`${styles.shippingbtn} main-bg white margin-y w-100 pointer bluebg`} onClick={makeorder}>MAKE PAYMENT</button>
                </div>
               
                </div>
            </div>
        </>
    );
}


export default Payment;