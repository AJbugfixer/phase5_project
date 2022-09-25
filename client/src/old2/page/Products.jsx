import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import CardProducts from '../component/CardProducts'
// import { DataContext } from '../context/DataContext'
import { useHistory } from 'react-router-dom'
const Products = () => {
    const [getdata, setGetdata] = useState([])
    const [categories, setCategories] = useState([])

    const timeout = useRef(null)
    const his = useHistory()
    // const checkAuth=()=>{
    //     axios.get("http://localhost:8000/isAuth",{
    //         headers:{
    //          "x-access-token":localStorage.getItem("Ecomtoken")
    //         }
    //     }).then((response)=>{
    //      //  console.log()
    //      if(!response.data.login)
    //      {
    //          his.push("/");
    //      }
    //     })

    //  }

    //  useEffect(()=>{
    //     timeout.current=setTimeout(checkAuth,1000)
    //     return function(){
    //         if(timeout.current)
    //         {
    //             clearTimeout(timeout.current)
    //         }
    //     }
    //  },[])

    const getData = async (category) => {
        const res = await axios.get(`https://dummyjson.com/products${category ? `/category/${category}` : ""}`)
        if (res.status == 200) {
            setGetdata(res.data.products)
        }
    }
    const getCategories = async () => {
        const res = await axios.get('https://dummyjson.com/products/categories')
        if (res.status == 200) {
            setCategories(res.data)
        }
    }

    useEffect(() => {
        getData()
        getCategories()
    }, [])

    const sortHandel = (e) => {
        const sort = e.target.value
        if (sort === 'all') {
            getData()
        }
        else {
            getData(sort)
        }

    }

    if (!getdata.length) {
        return <h1>Loading..</h1>
    }

    return (
        <>
            <div className="products">
                <div className="container">
                    <h2 className="text-center font-weight-bold mb-5">Best Products</h2>
                    <div className="inp ">
                        <p></p>
                        <div className="form-group">

                            <select className="form-control" id="" onChange={sortHandel}>
                                <option value="all">All</option>
                                {
                                    categories.map(category => <option key={category} value={category}>{category}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        {
                            getdata.map((val, ind) => {
                                return (
                                    <CardProducts
                                        key={ind}
                                        id={val.id}
                                        name={val.title}
                                        price={val.price}
                                        thumbnail={val.thumbnail}
                                    />
                                )
                            })
                        }



                    </div>
                </div>
            </div>


        </>
    )
}

export default Products
