import Sidebar from './Sidebar';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
	return (
		<div
			className={`flex min-w-screen min-h-screen`}>
			<Sidebar />
			<main className='p-4'>{children}</main>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout