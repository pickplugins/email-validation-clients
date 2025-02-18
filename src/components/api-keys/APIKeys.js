const { Component } = wp.element;
import { __ } from "@wordpress/i18n";

import { applyFilters } from "@wordpress/hooks";

import {
	createElement,
	useCallback,
	memo,
	useMemo,
	useState,
	useEffect,
} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { useSelect } from "@wordpress/data";
import {
	__experimentalInputControl as InputControl,
	Popover,
	Spinner,
	PanelBody,
	ToggleControl,
	PanelRow,
	ColorPalette,
	RangeControl,
	TextareaControl,
} from "@wordpress/components";
import PGDropdown from "../dropdown";
var myStore = wp.data.select("postgrid-shop");
const PGAPIKeys = (props) => {
	const [apiKeys, setapiKeys] = useState(props.args);
	const keysListBasic = {
		recaptcha: {
			id: "recaptcha",
			label: "recaptcha",
			args: {
				site_key: "",
				secret_key: "",
				version: "v2Checkbox", // v3, v2Checkbox, v2Invisible
			},
			//	isPro: true
		},
		// hCAPTCHA: {
		// 	id: "hCAPTCHA",
		// 	label: "hCAPTCHA",
		// 	args: {
		// 		site_key: "",
		// 	},
		// },
		dropbox: {
			id: "dropbox",
			label: "Dropbox",
			args: {
				accessToken: "",
			},
			isPro: true,
		},
		googleDrive: {
			id: "googleDrive",
			label: "Google Drive",
			args: {
				accessToken: "",
			},
			isPro: true,
		},


		airtable: {
			id: "airtable",
			label: "Airtable",
			args: {
				accessToken: "",
			},
			isPro: true,
		},
		googleMap: {
			id: "googleMap",
			label: "Google Map",
			args: {
				accessToken: "",
			},
			isPro: true,
		},
		zendesk: {
			id: "zendesk",
			label: "Zendesk",
			args: {
				apiToken: "",
				subdomain: "",
				email: "",
			},
			isPro: true,
		},
		twilio: {
			id: "twilio",
			label: "Twilio",
			args: {
				authToken: "",
				accountSid: "",
				phoneNumber: "",
				text: "",
			},
			isPro: true,
		},


		// gMAP: {
		// 	id: "gMAP",
		// 	label: "Google Map",
		// 	args: {
		// 		apikey: "",
		// 	},
		// },


		openAI: {
			id: "openAI",
			label: "openAI",
			args: {
				apikey: "",
				model: "",
			},
			isPro: true,

		},
		acumbamail: {
			id: "acumbamail",
			label: "Acumbamail",
			args: {
				apikey: "",
				authToken: "",
			},
			isPro: true,
		},
		brevo: {
			id: "brevo",
			label: "Brevo",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		omnisend: {
			id: "omnisend",
			label: "Omnisend",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		klaviyo: {
			id: "klaviyo",
			label: "Klaviyo",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		// aweber: {
		// 	id: "aweber",
		// 	label: "Aweber API",
		// 	args: {
		// 		accountId: "",
		// 		accessToken: "",
		// 	},
		// },
		mailerlite: {
			id: "mailerlite",
			label: "Mailer Lite",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		emailoctopus: {
			id: "emailoctopus",
			label: "Email Octopus",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		sender: {
			id: "sender",
			label: "Sender",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		youtube: {
			id: "youtube",
			label: "Youtube",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		// constantcontact: {
		// 	id: "constantcontact",
		// 	label: "Constant Contact",
		// 	args: {
		// 		accessToken: "",
		// 	},
		// 	isPro: true,
		// },
		// getresponse: {
		// 	id: "getresponse",
		// 	label: "Get Response",
		// 	args: {
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		// drip: {
		// 	id: "drip",
		// 	label: "Drip",
		// 	args: {
		// 		accountId: "",
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		mailmodo: {
			id: "mailmodo",
			label: "mailmodo",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		moosend: {
			id: "moosend",
			label: "Moo Send",
			args: {
				apikey: "",
			},
			isPro: true,
		},
		// hubspot: {
		// 	id: "hubspot",
		// 	label: "Hub Spot",
		// 	args: {
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		mailjet: {
			id: "mailjet",
			label: "Mailjet",
			args: {
				apikeyPublic: "",
				apikeyPrivate: "",
			},
			isPro: true,
		},
		// mailgun: {
		// 	id: "mailgun",
		// 	label: "Mailgun",
		// 	args: {
		// 		username: "",
		// 		pass: "",
		// 	},
		// 	isPro: true,
		// },
		// convertkit: {
		// 	id: "convertkit",
		// 	label: "Convert Kit",
		// 	args: {
		// 		apikey: "",
		// 		apiSecret: "",
		// 	},
		// 	isPro: true,
		// },
		// elasticemail: {
		// 	id: "elasticemail",
		// 	label: "Elastice Mail",
		// 	args: {
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		// sendgrid: {
		// 	id: "sendgrid",
		// 	label: "Send Grid",
		// 	args: {
		// 		apikey: "",
		// 	},
		// 	isPro: true,
		// },
		// mailchimp: {
		// 	id: "mailchimp",
		// 	label: "Mail Chimp",
		// 	args: {
		// 		apikey: "",
		// 		dc: "",
		// 	},
		// 	isPro: true,
		// },
		// activecampaign: {
		// 	id: "activecampaign",
		// 	label: "Active Campaign",
		// 	args: {
		// 		apikey: "",
		// 		accountName: "",
		// 	},
		// 	isPro: true,
		// },
		// zoho: {
		// 	id: "zoho",
		// 	label: "Zoho",
		// 	args: {
		// 		apikey: "",
		// 	},
		//isPro: true
		// },
		// netcore: {
		// 	id: "netcore",
		// 	label: "Net Core",
		// 	args: {
		// 		apikey: "",
		// 	},
		//isPro: true
		// },
		// postman: {
		// 	id: "postman",
		// 	label: "Postman",
		// 	args: {
		// 		apikey: "",
		// 	},
		//isPro: true
		// },
	};
	let keysList = applyFilters("pgAPIKeys", keysListBasic);
	useEffect(() => {
		props.onChange(apiKeys);
	}, [apiKeys]);
	function handleSetAPIKeys(option, index) {
		const { id, label, args } = option;
		const newApiKeys = {
			...apiKeys,
			[id]: { id, label, args },
		};
		setapiKeys(newApiKeys);
	}
	function handleInputChange(id, field, value) {
		setapiKeys((prevState) => ({
			...prevState,
			[id]: {
				...prevState[id],
				args: {
					...prevState[id].args,
					[field]: value,
				},
			},
		}));
	}
	function handleDeleteKey(id) {
		setapiKeys((prevState) => {
			const newApiKeys = { ...prevState };
			delete newApiKeys[id];
			return newApiKeys;
		});
	}
	return (
		<div className="">
			<div className="flex items-center gap-6 mb-10 ">
				<label htmlFor="" className="font-medium text-slate-900  pg-font  ">
					{__("Site Name", "post-grid")}
				</label>
				<PGDropdown
					position="bottom right"
					// variant="secondary"
					options={keysList}
					buttonTitle="Choose"
					onChange={handleSetAPIKeys}
					values={[]}></PGDropdown>
			</div>
			{Object.entries(apiKeys).map(([key, value], index) => {
				return (
					<PanelBody
						className="font-medium text-slate-900 "
						key={index}
						title={
							<>
								<span
									className="w-[30px] h-[30px] bg-red-500 flex justify-center items-center cursor-pointer"
									onClick={() => handleDeleteKey(key)}>
									<span className="text-[20px] text-white">&times;</span>
								</span>
								<span className="px-3">{value.label}</span>
							</>
						}
						initialOpen={false}>
						{Object.entries(value.args).map(([item, value], i) => {
							return (
								<div
									className="pg-setting-input-text flex items-center gap-8 mb-4"
									key={i}>
									<label
										htmlFor=""
										className="font-medium text-slate-900 pg-font w-1/6 ">
										{item === "apikey" && <>{__("API Key", "post-grid")}</>}
										{item === "apiSecret" && (
											<>{__("API Secret", "post-grid")}</>
										)}
										{item === "username" && <>{__("UserName", "post-grid")}</>}
										{item === "accountName" && (
											<>{__("Account Name", "post-grid")}</>
										)}
										{item === "pass" && <>{__("Password", "post-grid")}</>}
										{item === "accountId" && (
											<>{__("Account Id", "post-grid")}</>
										)}
										{item === "subscriberId" && (
											<>{__("Subscriber Id", "post-grid")}</>
										)}
										{item === "listId" && <>{__("List Id", "post-grid")}</>}
										{item === "apiToken" && <>{__("API Token", "post-grid")}</>}
										{item === "subdomain" && <>{__("Subdomain", "post-grid")}</>}
										{item === "phoneNumber" && <>{__("Phone Number", "post-grid")}</>}
										{item === "accountSid" && <>{__("Account Sid", "post-grid")}</>}
										{item === "authToken" && <>{__("Auth Token", "post-grid")}</>}
										{item === "email" && <>{__("Email", "post-grid")}</>}
										{item === "accessToken" && (
											<>{__("Access Token", "post-grid")}</>
										)}
										{item === "campaignId" && (
											<>{__("Campaign Id", "post-grid")}</>
										)}
										{item === "apikeyPrivate" && (
											<>{__("Private Api Key", "post-grid")}</>
										)}
										{item === "apikeyPublic" && (
											<>{__("Public Api Key", "post-grid")}</>
										)}
										{item === "site_key" && <>{__("Site Key", "post-grid")}</>}
										{item === "dc" && <>{__("DC", "post-grid")}</>}
										{item === "secret_key" && (
											<>{__("Secret Key", "post-grid")}</>
										)}
										{item === "model" && <>{__("Model", "post-grid")}</>}
									</label>
									<InputControl
										value={value}
										className="min-w-[320px]"
										onChange={(newVal) => handleInputChange(key, item, newVal)}
									/>
								</div>
							);
						})}
					</PanelBody>
				);
			})}
		</div>
	);
};
export default PGAPIKeys;
