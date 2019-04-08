import React, { Component } from 'react';
import { recipe } from '../tempDetails';
export default class RecipeDetails extends Component {
	/*constructor(props) {
		super(props);

		this.state = {
			recipe: recipe,
			url: `https://www.food2fork.com/api/get?key=7ef52d43c9132a2fb47698f194f7f3d0&q&rId=${
				this.props.id
			} `,
		};
	}

	//fetch diifrent items
	//login to the account
	async componentDidMount() {
		try {
			const data = await fetch(this.state.url);
			const jsonData = await data.json();

			this.setState({
				recipe: jsonData.recipe,
			});
		} catch (error) {
			console.log(error);
		}
	}*/

	state = {
		recipe: recipe,
	};

	async componentDidMount() {
		const id = this.props.id;
		const url = `https://www.food2fork.com/api/get?key=7ef52d43c9132a2fb47698f194f7f3d0&q&rId=${id}`;

		try {
			const data = await fetch(url);
			// eslint-disable-next-line
			const jsonData = await data.json();

			this.setState(
				(state, props) => {
					//recipe: jsonData.recipe, not working
					return { recipe: jsonData.recipe };
				},
				() => {},
			);
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const {
			image_url,
			publisher,
			publisher_url,
			source_url,
			title,
			ingredients,
		} = this.state.recipe;

		const { handleIndex } = this.props;
		return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<div className="col-10 mx-auto col-md-6 my-3">
							<button
								className="btn btn-warning mb-5 text-capitalize"
								onClick={() => {
									handleIndex(1); //returns to home page
								}}
							>
								back to recipe list
							</button>
							<img src={image_url} alt="recipe" className="d-block w-100" />
						</div>

						{/**details */}
						<div className="col-10 mx-auto col-md-6 my-3">
							<h6 className="text-uppercase">{title}</h6>
							<h6 className="text-warning text-capitalize text-slanted">
								provided by{publisher}
							</h6>
							<a
								href={publisher_url}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-primary mt-2 text-capitalize"
							>
								publisher webpage
							</a>
							<a
								href={source_url}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-success mt-2 mx-3 text-capitalize"
							>
								recipe url
							</a>
							<ul className="list-group mt-4">
								<h2 className="mt-3 mb-4">Ingreadients</h2>
								{ingredients.map((item, index) => {
									return (
										<li key={index} className="list-group-item text-slanted">
											{item}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
