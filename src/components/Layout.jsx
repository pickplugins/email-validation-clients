import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useState, useEffect, Component } from "react";

import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import GlobalHeader from "../components/GlobalHeader";

const Layout = ({ children, user }) => {
	console.log(user)

	//const { user, loading } = useContext(AuthContext);


	return (
		<div
			className={`flex min-w-screen max-w-screen min-h-screen`}>
			<Sidebar />
			<main className='flex-1'>

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
	user: PropTypes.object
};

export default Layout