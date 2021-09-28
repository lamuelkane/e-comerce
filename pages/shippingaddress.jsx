import Head from 'next/head'
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Product.module.css'
import { useRouter } from "next/dist/client/router";

const Shippingaddress = () => {
    const [name, setname] = useState('')
    const [address, setaddress] = useState('')
    const [country, setcountry] = useState('')
    const [city, setcity] = useState('')
    const [phonenumber, setphonenumber] = useState('')
    const [email, setemail] = useState('')
    const [zip, setzip] = useState('')
    const router = useRouter()
    const submit = useRef()
    const saveaddress = (e) => {
        e.preventDefault()
        localStorage.setItem('address', JSON.stringify({
            name,
            email,
            zip,
            phonenumber,
            country,
            city,
            address
        }))
       router.push('/payment')
    }

    useEffect(() => {
        const shippingaddress = JSON.parse(localStorage.getItem('address'))
        if(shippingaddress){
            setname(shippingaddress.name)
            setemail(shippingaddress.email)
            setcity(shippingaddress.city)
            setcountry(shippingaddress.country)
            setaddress(shippingaddress.address)
            setphonenumber(shippingaddress.phonenumber)
            setzip(shippingaddress.zip)
        }

    }, [])

    return (
        <>
            <Head>
                <title>shipping-address</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="./assets/images/logo.jpg" />
            </Head>
            <div className={`bluebg flex align-center justify-center ${styles.shippingaddresss}`}>
                <div>
                    <form className={`flex column ${styles.shippingform}`} onSubmit={e => {
        e.preventDefault()
        localStorage.setItem('address', JSON.stringify({
            name,
            email,
            zip,
            phonenumber,
            country,
            city,
            address
        }))
       router.push('/payment')
    }}>
                        <div className={`flex column ${styles.shippingformitem}`}>
                            <label htmlFor="">Names</label>
                            <input type="text"  value={name} onChange={e => setname(e.target.value)} required/>
                        </div>
                        <div className={`flex column ${styles.shippingformitem}`}>
                            <label htmlFor="">Email</label>
                            <input type="email" value={email} onChange={e => setemail(e.target.value)} required/>
                        </div>
                        <div className={`flex column ${styles.shippingformitem}`}>
                            <label htmlFor="">Address</label>
                            <input type="text" value={address} onChange={e => setaddress(e.target.value)} required/>
                            <span>We'll never share your email with anyone else.</span>
                        </div>
                        <div className={`flex column ${styles.shippingformitem}`}>
                            <label htmlFor="">Country</label>
                            <input type="text" value={country} onChange={e => setcountry(e.target.value)} required/>
                        </div>
                        <div className={`flex column ${styles.shippingformitem}`}>
                            <label htmlFor="">City</label>
                            <input type="text" value={city} onChange={e => setcity(e.target.value)} required/>
                        </div>
                        <div className={`flex column ${styles.shippingformitem}`}>
                            <label htmlFor="">Phone Number</label>
                            <input type="number" value={phonenumber} onChange={e => setphonenumber(e.target.value)} required/>
                        </div>
                        <div className={`flex column ${styles.shippingformitem}`}>
                            <label htmlFor="">Zip</label>
                            <input type="number" value={zip} onChange={e => setzip(e.target.value)} required/>
                        </div>
                        <button className="hide" ref={submit}></button>
                    </form>
                     <button className={`${styles.shippingbtn} main-bg white pointer bluebg`} onClick={e => submit.current.click()}>Make Payment</button>
                </div>
            </div>
        </>
    );
}


export default Shippingaddress;