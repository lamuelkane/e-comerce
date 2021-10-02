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


const Test = () => {
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

    // useEffect(() => {
    //     setshippingaddress(JSON.parse(localStorage.getItem('address')))
    //     if(!JSON.parse(localStorage.getItem('address')) || !cartitems[0]) router.push('/shippingaddress')
    // }, [])

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
                <div className='padding flex wrap justify-around'> 
                <div className="w-50 w-s-90 margin-auto">
                    <div className="products-container">
                        <div className='main-bg white padding'>
                            <h2 className="center">Order Preview</h2>
                            <p className="center">just a preview of your order</p>
                        </div>
                    <p>Your Order </p>
                    <div className="cener margin-bottom">
                            <h3>Shipping Address</h3>
                            <div><b>Country</b>: any country</div>
                            <div><b>City</b>: tiko</div>
                            <div><b>Address</b>: sample address</div> 
                            <div><b>Zip</b>:  00000</div>
                            <div><b>Name</b>: test name</div>
                            <div><b>Contact</b>: 0000000000</div>
                        </div>
                    <table className="cartItems"> 
                            {/* <tr>
                                <th>img</th>
                                <th>name</th>
                                <th>price</th>
                                <th>amount</th>
                                <th>total</th>
                            </tr> */}
                            <tr>
                                <td className='td1'><img src='http://advancedshopping.herokuapp.com/assets/images/logo.jpg' alt='' /></td>
                                <td className='td2'>January</td>
                                <td className='td3'>$100</td>
                                <td className='td4'>10</td>
                                <td className='td5'>$1000</td>
                            </tr>           
                            <tr>
                                <td className='td1'><img src='http://advancedshopping.herokuapp.com/assets/images/logo.jpg' alt='' /></td>
                                <td className='td2'>January</td>
                                <td className='td3'>$100</td>
                                <td className='td4'>10</td>
                                <td className='td5'>$1000</td>
                            </tr>  
                            <tr>
                                <td className='td1'><img src='http://advancedshopping.herokuapp.com/assets/images/logo.jpg' alt='' /></td>
                                <td className='td2'>January</td>
                                <td className='td3'>$100</td>
                                <td className='td4'>10</td>
                                <td className='td5'>$1000</td>
                            </tr> 

                    </table>
                    <hr></hr>
                    <div className="ino">
                        {/* <div className="center">
                            <h3>Shipping Address</h3>
                            <div><b>Country</b>: any country</div>
                            <div><b>City</b>: tiko</div>
                            <div><b>Address</b>: sample address</div> 
                            <div><b>Zip</b>:  00000</div>
                            <div><b>Name</b>: test name</div>
                            <div><b>Contact</b>: 0000000000</div>
                        </div> */}
                        <hr />
                        <div className="center">
                            <h3>Details</h3>
                            <div><b>Subtotal</b>: <span>$55</span></div>
                            <div><b>Shipping</b>: <span>$100.00</span></div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="section">
                        <div>
                            <p className='order-totaltext'>Order Total</p>
                            <h3 className='order-total'>$441.00</h3>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="section-dividr">
                        <div>
                            <h3 className='order-total'><small>Payment With    </small><span>447.990</span></h3>
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


export default Test;