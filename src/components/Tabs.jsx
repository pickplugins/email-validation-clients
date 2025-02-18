import React, { useState } from "react";

const Spinner = ({ tabs, children }) => {
	const [activeTab, setActiveTab] = useState(0);
	const childrenArray = React.Children.toArray(children);

	return (
		<div className="w-full  mx-auto ">
			<div className="flex border-b border-primary-300">
				{tabs.map((tab, index) => (
					<div
						key={index}
						className={`py-2 px-4 text-sm bg-primary-800 !text-primary-200 dark:bg-primary-200 dark:!text-primary-800 font-medium focus:outline-none transition-all cursor-pointer ${
							activeTab === index
								? "border-b-2 border-blue-500 bg-blue-500 "
								: " "
						}`}
						onClick={() => setActiveTab(index)}>
						{tab.label}
					</div>
				))}
			</div>
			<div className="mt-4 p-4 ">
				{childrenArray.find((child) => child.props.index === activeTab)}
			</div>
		</div>
	);
};

export default Spinner;
