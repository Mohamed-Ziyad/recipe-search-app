import React, { Component } from 'react';
import './App.css';
// eslint-disable-next-line
import { recipes } from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
	state = {
		recipes: recipes,
		url:
			'https://www.food2fork.com/api/search?key=7ef52d43c9132a2fb47698f194f7f3d0 ',
		base_url:
			'https://www.food2fork.com/api/search?key=7ef52d43c9132a2fb47698f194f7f3d0 ',

		details_id: 35389,
		pageIndex: 1,
		search: '',
		query: '&q=',
		error: '',
	};

	async getRecipes() {
		try {
			const data = await fetch(this.state.url);
			// eslint-disable-next-line
			const jsonData = await data.json();
			//console.log(jsonData);

			if (jsonData.recipes.length === 0) {
				this.setState(() => {
					return { error: 'sorry, No results' };
				});
			} else {
				this.setState(() => {
					return { recipes: jsonData.recipes, error: '' };
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	//getting all from api
	componentDidMount() {
		this.getRecipes();
	}

	//conditional render
	displayPage = index => {
		switch (index) {
			default:
			case 1: //when the page loads
				return (
					<RecipeList
						//this props passed to recipie list to recipe
						//I can pass this staight to recipe
						recipes={this.state.recipes}
						handleDetails={this.handleDetails}
						value={this.state.search}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						error={this.state.error}
					/>
				);

			case 0: //when a event trigger
				return (
					<RecipeDetails
						id={this.state.details_id}
						handleIndex={this.handleIndex} //passed as props
					/>
				);
		}
	};

	//takes the index
	handleIndex = index => {
		this.setState({
			pageIndex: index,
		});
	};
	//takes the index and the id
	handleDetails = (index, id) => {
		this.setState({
			pageIndex: index,
			details_id: id,
		});
	};
	//check the log first and do the actual funtion
	handleChange = e => {
		//console.log('handle change');
		this.setState(
			{
				search: e.target.value,
			},
			() => {},
		);
	};

	handleSubmit = e => {
		e.preventDefault();
		const { base_url, query, search } = this.state;
		this.setState(
			() => {
				return { url: `${base_url}${query}${search}`, search: '' };
			},
			() => {
				this.getRecipes();
			},
		);
	};

	render() {
		//console.log(this.state.recipes);
		return (
			<React.Fragment>
				{this.displayPage(
					this.state.pageIndex,
				) /**display by state page index */}
			</React.Fragment>
		);
	}
}

export default App;
