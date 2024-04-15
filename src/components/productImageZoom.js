// components/ImageZoom.js
import React from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

const ProductImageZoom = ({ imageSrc }) => {
    return (
        <InnerImageZoom
            src={imageSrc}
            zoomSrc={imageSrc}
            alt="Your Image"
            zoomType="hover"
            zoomPreload={true}
            hideCloseButton={true}
            imgAttributes={{
                srcSet: {imageSrc}
            }}
                sources={[{
                srcSet: {imageSrc},
                media: '(min-width: 768px)'
            }]}
        />
    );
};
export default ProductImageZoom;
