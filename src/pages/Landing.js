import React from "react";
import classes from "./Landing.module.css";
import Fader from "../components/Fader";

function Landing() {
	return (
		<main className={classes.landing}>
			<section className={classes.title}>
				<Fader time="200">
					<h1>
						Keep an eye on your <br />
						digital money.
					</h1>
					<h2>Cryptocurrency investments at a glance </h2>
				</Fader>
				<div className={classes.learn}>
					<Fader time="800">
						<a>Learn More ↓</a>
					</Fader>
				</div>
			</section>
			<section className={classes.lower}>
				<article id={classes.features}>
					<div>
						<h4 className={classes.label}>Features</h4>
						<h3>Modern tools make money simple.</h3>
					</div>
				</article>
			</section>
		</main>
	);
}

export default Landing;
