import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const {productKey} = useParams();
    return (
        <div>
            <h1>{productKey} Product Detail Page</h1>
        </div>
    );
};

export default ProductDetail;