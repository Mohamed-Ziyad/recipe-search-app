import React, { Component } from 'react';
import './App.css';
// eslint-disable-next-line
import { recipes } from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
class App extends Component {
	render() {
		return (
			<React.Fragment>
				<RecipeList />
				<RecipeDetails />
			</React.Fragment>
		);
	}
}

export default App;
