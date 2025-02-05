import Layout from "../components/Layout";

function Products() {
	return (
		<Layout>
			<div>
				Products
				<div>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
						return (
							<div key={index}>
								<a href={`/products/${item}`}>Product {item}</a>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}

export default Products;
