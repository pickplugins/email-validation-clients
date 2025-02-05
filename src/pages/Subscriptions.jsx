import Layout from "../components/Layout";

function Subscriptions() {
	return (
		<Layout>
			<div>
				Subscriptions
				<div>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
						return (
							<div key={index}>
								<a href={`/subscriptions/${item}`}>Subscription {item}</a>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}

export default Subscriptions;
