import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useState, useEffect, Component } from "react";

import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import GlobalHeader from "../components/GlobalHeader";

const Layout = ({ children }) => {



	return (
		<div className={`flex min-h-screen bg-primary-200 dark:bg-primary-900 text-primary-900 dark:text-primary-100`}>
			<div className="min-w-[56px]">
				<Sidebar />
			</div>
			<main className="md:flex-1 w-[calc(100%-56px)] md:w-full">
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