import * as React from "react";
export const LogoIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		viewBox="0 0 24 24"
		{...props}>
		<path d="M18 18a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1" />
		<path d="M24 16c0-1.127-.102-2.28-.306-3.429a4.92 4.92 0 0 0-2.543-3.473c-.048-.026-.1-.028-.151-.046V7c0-1.654-1.346-3-3-3h-1.046l-1.82-2.3C14.373.734 13.23.18 12 .18S9.628.734 8.866 1.7L7.046 4H6C4.346 4 3 5.346 3 7v2.053c-.05.017-.103.019-.151.045a4.92 4.92 0 0 0-2.544 3.478C.102 13.72 0 14.873 0 16s.102 2.28.306 3.426c.373 2.091 2.056 3.708 4.188 4.023C6.962 23.814 9.487 24 12 24c1.477 0 2.983-.07 4.48-.203A6 6 0 0 0 18 24c3.308 0 6-2.691 6-6 0-.245-.02-.484-.048-.722.027-.408.048-.836.048-1.278m-3.204-4.722a2.9 2.9 0 0 1 .93 1.646c.024.141.034.282.055.423a6 6 0 0 0-1.983-1.071zM10.435 2.939c.762-.965 2.367-.966 3.13.001l.84 1.06H9.596zM4.787 21.472c-1.281-.19-2.29-1.153-2.512-2.395C2.092 18.046 2 17.01 2 16s.092-2.046.274-3.071c.117-.647.448-1.22.93-1.651l5.259 5.26A5 5 0 0 0 12 18.002a5.97 5.97 0 0 0 1.518 3.973 49 49 0 0 1-8.731-.505m7.58-5.515c-.91.11-1.83-.173-2.49-.833L5 10.246V7c0-.551.449-1 1-1h12c.551 0 1 .449 1 1v3.246l-1.816 1.816a6.01 6.01 0 0 0-4.818 3.894M18 22c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4" />
		<circle cx={18} cy={16} r={1} />
	</svg>
);

export const SunIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		{...props}
		className={`w-full h-auto`}>
		<g
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2">
			<g strokeDasharray="2">
				<path d="M12 21v1M21 12h1M12 3v-1M3 12h-1">
					<animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						dur="0.2s"
						values="4;2"
					/>
				</path>
				<path d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5">
					<animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						begin="0.2s"
						dur="0.2s"
						values="4;2"
					/>
				</path>
			</g>
			<path
				fill="currentColor"
				d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
				opacity="0">
				<set attributeName="opacity" begin="0.5s" to="1" />
			</path>
		</g>
		<g fill="currentColor" fillOpacity="0">
			<path d="m15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z">
				<animate
					id="lineMdSunnyFilledLoopToMoonFilledLoopTransition0"
					fill="freeze"
					attributeName="fill-opacity"
					begin="0.6s;lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+6s"
					dur="0.4s"
					values="0;1"
				/>
				<animate
					fill="freeze"
					attributeName="fill-opacity"
					begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+2.2s"
					dur="0.4s"
					values="1;0"
				/>
			</path>
			<path d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
				<animate
					fill="freeze"
					attributeName="fill-opacity"
					begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+3s"
					dur="0.4s"
					values="0;1"
				/>
				<animate
					fill="freeze"
					attributeName="fill-opacity"
					begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+5.2s"
					dur="0.4s"
					values="1;0"
				/>
			</path>
			<path d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
				<animate
					fill="freeze"
					attributeName="fill-opacity"
					begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+0.4s"
					dur="0.4s"
					values="0;1"
				/>
				<animate
					fill="freeze"
					attributeName="fill-opacity"
					begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+2.8s"
					dur="0.4s"
					values="1;0"
				/>
			</path>
			<path d="m20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z">
				<animate
					fill="freeze"
					attributeName="fill-opacity"
					begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+3.4s"
					dur="0.4s"
					values="0;1"
				/>
				<animate
					fill="freeze"
					attributeName="fill-opacity"
					begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+5.6s"
					dur="0.4s"
					values="1;0"
				/>
			</path>
		</g>
		<mask id="lineMdSunnyFilledLoopToMoonFilledLoopTransition1">
			<circle cx="12" cy="12" r="12" fill="#fff" />
			<circle cx="22" cy="2" r="3" fill="#fff">
				<animate
					fill="freeze"
					attributeName="cx"
					begin="0.1s"
					dur="0.4s"
					values="22;18"
				/>
				<animate
					fill="freeze"
					attributeName="cy"
					begin="0.1s"
					dur="0.4s"
					values="2;6"
				/>
				<animate
					fill="freeze"
					attributeName="r"
					begin="0.1s"
					dur="0.4s"
					values="3;12"
				/>
			</circle>
			<circle cx="22" cy="2" r="1">
				<animate
					fill="freeze"
					attributeName="cx"
					begin="0.1s"
					dur="0.4s"
					values="22;18"
				/>
				<animate
					fill="freeze"
					attributeName="cy"
					begin="0.1s"
					dur="0.4s"
					values="2;6"
				/>
				<animate
					fill="freeze"
					attributeName="r"
					begin="0.1s"
					dur="0.4s"
					values="1;10"
				/>
			</circle>
		</mask>
		<circle
			cx="12"
			cy="12"
			r="6"
			fill="currentColor"
			mask="url(#lineMdSunnyFilledLoopToMoonFilledLoopTransition1)">
			<set attributeName="opacity" begin="0.5s" to="0" />
			<animate
				fill="freeze"
				attributeName="r"
				begin="0.1s"
				dur="0.4s"
				values="6;10"
			/>
		</circle>
	</svg>
);

export const MoonIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		{...props}
		className={`w-full h-auto`}>
		<rect x="0" y="0" width="24" height="24" fill="rgba(255, 255, 255, 0)" />
		<g
			fill="none"
			stroke="currentColor"
			strokeDasharray="2"
			strokeDashoffset="2"
			strokeLinecap="round"
			strokeWidth="2">
			<path d="M0 0">
				<animate
					fill="freeze"
					attributeName="d"
					begin="1.2s"
					dur="0.2s"
					values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
				/>
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					begin="1.2s"
					dur="0.2s"
					values="2;0"
				/>
			</path>
			<path d="M0 0">
				<animate
					fill="freeze"
					attributeName="d"
					begin="1.5s"
					dur="0.2s"
					values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
				/>
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					begin="1.5s"
					dur="1.2s"
					values="2;0"
				/>
			</path>
			<animateTransform
				attributeName="transform"
				dur="30s"
				repeatCount="indefinite"
				type="rotate"
				values="0 12 12;360 12 12"
			/>
		</g>
		<g fill="currentColor">
			<path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
				<animate
					fill="freeze"
					attributeName="fill-opacity"
					dur="0.4s"
					values="1;0"
				/>
			</path>
			<path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
				<animate
					fill="freeze"
					attributeName="fill-opacity"
					begin="0.2s"
					dur="0.4s"
					values="1;0"
				/>
			</path>
		</g>
		<g
			fill="currentColor"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2">
			<path d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" />
			<set attributeName="opacity" begin="0.6s" to="0" />
		</g>
		<mask id="lineMdMoonFilledToSunnyFilledLoopTransition0">
			<circle cx="12" cy="12" r="12" fill="#fff" />
			<circle cx="18" cy="6" r="12" fill="#fff">
				<animate
					fill="freeze"
					attributeName="cx"
					begin="0.6s"
					dur="0.4s"
					values="18;22"
				/>
				<animate
					fill="freeze"
					attributeName="cy"
					begin="0.6s"
					dur="0.4s"
					values="6;2"
				/>
				<animate
					fill="freeze"
					attributeName="r"
					begin="0.6s"
					dur="0.4s"
					values="12;3"
				/>
			</circle>
			<circle cx="18" cy="6" r="10">
				<animate
					fill="freeze"
					attributeName="cx"
					begin="0.6s"
					dur="0.4s"
					values="18;22"
				/>
				<animate
					fill="freeze"
					attributeName="cy"
					begin="0.6s"
					dur="0.4s"
					values="6;2"
				/>
				<animate
					fill="freeze"
					attributeName="r"
					begin="0.6s"
					dur="0.4s"
					values="10;1"
				/>
			</circle>
		</mask>
		<circle
			cx="12"
			cy="12"
			r="10"
			fill="currentColor"
			mask="url(#lineMdMoonFilledToSunnyFilledLoopTransition0)"
			opacity="0">
			<set attributeName="opacity" begin="0.6s" to="1" />
			<animate
				fill="freeze"
				attributeName="r"
				begin="0.6s"
				dur="0.4s"
				values="10;6"
			/>
		</circle>
	</svg>
);
