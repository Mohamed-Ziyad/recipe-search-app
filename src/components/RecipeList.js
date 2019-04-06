import React, { Component } from 'react';
import Recipe from './Recipe';
import RecipeSearch from './RecipeSearch';
import { recipe } from '../tempDetails';
import { recipes } from '../tempList';
export default class RecipeList extends Component {
	render() {
		const { recipes } = this.props;
		return (
			<React.Fragment>
				<RecipeSearch />
				<div className="container my-5">
					{/*title*/}
					<div className="row">
						<div className="col-10 mx-auto col-md-6 text-center-uppercase mb-3" />
						<h1 className="text-slanted">Recipe List</h1>
					</div>
					{/*ends here*/}

					<div className="row">
						{recipes.map(recipe => {
							return <Recipe key={recipe.recipe_id} recipe={recipe} />;
						})}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
