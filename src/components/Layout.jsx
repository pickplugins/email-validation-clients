import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import GlobalHeader from "../components/GlobalHeader";

const Layout = ({ children }) => {

	const { user, loading } = useContext(AuthContext);


	return (
		<div
			className={`flex min-w-screen min-h-screen`}>
			<Sidebar />
			<main className=' basis-[100%]'>

				<GlobalHeader user={user} />

				<div className=''>
					{children}
				</div>
			</main>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout