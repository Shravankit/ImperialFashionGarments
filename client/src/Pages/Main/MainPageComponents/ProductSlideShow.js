import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductSlideShow = () => {

    const [productImages, setProductImages] = useState([]);

    const handleImages = async (id) => {
        try {
            const {data} = await axios.get('/api/v1/product/get-all-product');
            setProductImages(data.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleImages();
    }, [])

  return (
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    {productImages.map((p, index) => (
        <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={p._id}>
            <img src={`/api/v1/product/get-product-photo/${p._id}`} className="d-block w-10s0" height={950} alt={p.name} />
        </div>
    ))}
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

  )
}

export default ProductSlideShow