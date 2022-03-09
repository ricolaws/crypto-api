import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

function MainHeader(props) {
	const { links, button, style } = props;

	const submitHandler = (e) => {
		const handler = button.handler;
		handler();
	};

	return (
		<header style={{ background: style }}>
			<nav>
				<ul>
					{links.map((link) => {
						return (
							<li>
								<NavLink activeClassName={classes.active} to={`/${link}`}>
									{link}
								</NavLink>
							</li>
						);
					})}
					<li>
						<NavLink activeClassName={classes.active} to={button.to}>
							<button onClick={submitHandler}>{button.label}</button>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;
