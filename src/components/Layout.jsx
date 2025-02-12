import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useState, useEffect, Component } from "react";

import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import GlobalHeader from "../components/GlobalHeader";

const Layout = ({ children }) => {



	return (
		<div className={`flex max-w-screen min-h-screen`}>
			<Sidebar />
			<main className="flex-1">
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