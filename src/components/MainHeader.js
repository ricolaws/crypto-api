import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

function MainHeader(props) {
	const { links, button, style, msg } = props;

	const submitHandler = (e) => {
		const handler = button.handler;
		handler();
	};

	return (
		<header style={{ background: style }}>
			<div className={classes.message}>
				<h1>{msg}</h1>
			</div>
			<nav className={classes.nav}>
				<ul>
					{links.map((link) => {
						return (
							<li className={classes.li}>
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
