import React from 'react';
import {Row} from 'reactstrap';

function ProductDetailsFeaturedImages({ selectedProduct }) {
	return (
		<div>
			{selectedProduct.featuredImages.map((imgUrl) => (
				<div className='row' style={{justifyContent: 'center', padding:20}}>
					<img style={{maxHeight: '70%', maxWidth: '70%', objectFit: 'contain'}} src={imgUrl} alt={imgUrl}></img>
				</div>
			))}
		</div>
	);
}

export default ProductDetailsFeaturedImages;
