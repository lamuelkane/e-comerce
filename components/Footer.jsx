import Footerproduct from "./Footerproduct";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import {setcartitems} from "../actions/product";
import ProductDetails from "./ProductDetails";
import axios from 'axios';


const Footer = (props) => {   
  const [clone1, setclone1] = useState([])
  const [clone2, setclone2] = useState([])
  const [clone3, setclone3] = useState([])
  const {products} = useContext(GlobalContext)

useEffect(() => {
    setclone3(products)
    setclone2(products)
    setclone1(products)
})

    return (
        <>
                <ProductDetails />
            <footer className={`main-bg`}>
                <div className={`flex justify-evenly wrap columnl margin-top`}>
                    <div className={`flex-3 margin-right`}>
                        <h3 className={`footertitle`}>GET IN TOUCH WITH US</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <input type="text" id='search' className={``} placeholder='search products'/>
                    </div>
                    <div className={`flex-3 margin-right`}>
                    <h3 className={`footertitle`}>MOST VIEWED PRODUCTS</h3>
                        {
                            clone1.sort((a, b) => {
                                return b.numviews - a.numviews
                            }).slice(0, 6).map(prod => (
                                <Footerproduct product={prod} key={prod.name} text={`viewed ${prod.numviews} times`}  />
                            ))
                        }
                    </div>
                    <div className={`flex-3 margin-right`}>
                    <h3 className={`footertitle`}>RECENTLY ORDERED PRODUCTS</h3>
                        {
                            clone3.sort((a, b) => {
                                let older = new Date(a.lastlyOrdered).getTime()
                                let newer = new Date(b.lastlyOrdered).getTime()
                                return older > newer? -1 : 1
                            }).slice(0, 6).map(prod => (
                                <Footerproduct product={prod} key={prod.name} text={`lastlyordered at ${prod.lastlyOrdered.substring(0, 10)}`} />
                            ))
                        }
                    </div>
                    <div className={`flex-3 margin-right`}>
                    <h3 className={`footertitle`}>MOST ORDERED PROUCTS</h3>
                        {
                            clone2.sort((a, b) => {
                                  return b.numOrders - a.numOrders;
                              }).slice(0, 6).map(prod => (
                                <Footerproduct product={prod} key={prod.name} text={`ordered ${prod.numOrders} times`} />
                            ))
                        }
                    </div>
                </div>
            </footer>
        </>
    );
}


export default Footer;
