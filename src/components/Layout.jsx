import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useState, useEffect, Component } from "react";

import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import GlobalHeader from "../components/GlobalHeader";

const Layout = ({ children }) => {



	return (
		<div className={`flex min-h-screen`}>
			<div className="border-r border-gray-400">
				<Sidebar />
			</div>
			<main className="md:flex-1 w-[calc(100%-56px)] md:w-full bg-gray-100">
				<GlobalHeader />

				<div className="">{children}</div>
			</main>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout