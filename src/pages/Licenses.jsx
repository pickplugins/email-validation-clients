import Layout from "../components/Layout";

function Licenses() {
	return (
		<Layout>
			<div>
				Licenses
				<div>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
						return (
							<div key={index}>
								<a href={`/licenses/${item}`}>License {item}</a>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}

export default Licenses;
