import React, { Component } from 'react';

class App extends Component {
	constructor(){
		super();
		this.state = {
			stage:'not-start',
			teamAName:null,
			teamBName:null,
			teamAGoals:[],
			teamBGoals:[],
			currentTime:0
		};
		
		this.timer = null;

		this.setTeamName = this.setTeamName.bind(this);
		this.startGame = this.startGame.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.endGame = this.endGame.bind(this);
		this.scoreTeam = this.scoreTeam.bind(this);

	}
	setTeamName(which) {
		let key = 'team'+which+'Name';
		this.setState({
			[key]:this.refs[which].value
		});
	}
	startGame(){
		this.setState({
			state:'start'
		}, () => {
			this.startTimer()
		})
	}

	startTimer(){ 
		this.setState({
			stage:'start'
		}, () => {
			this.timer = setInterval(() => this.setState({currentTime:this.state.currentTime+1}), 1);
		})
	}

	endGame(){
		this.setState({
			stage:'end'
		}, () => {
			clearInterval(this.timer);
		})
	}

	scoreTeam(which) {
		let key = 'team'+which+'Goals';
		const { currentTime } = this.state;
		const target = this.state[key];
		target.push(currentTime);
		this.setState({
			[key]:target
		});
	}

	render(){
		const { stage, teamAName, teamBName, teamAGoals, teamBGoals, currentTime } = this.state;
		let scoreAJsx = teamAGoals.map((v,i) => <li key={i}>{v} milliseconds</li>);
		let scoreBJsx = teamBGoals.map((v,i) => <li key={i}>{v} milliseconds</li>);
		return (<div>
			{stage === 'not-start' && 
				<div>
					The game has not started - so let's name the teams.<br/>
					{!teamAName && <span><input type="text" ref="A"/>
					<button onClick={() => this.setTeamName('A')}>Name team A</button></span>}
					{teamAName && <span>Team A is called {teamAName}</span>}<br/>
					{!teamBName && <span><input type="text" ref="B"/>
					<button onClick={() => this.setTeamName('B')}>Name team B</button></span>}
					{teamBName && <span>Team B is called {teamBName}</span>}<br/>
					<button onClick={this.startGame}>Start Game</button>
				</div>
			}

			{stage === 'start' && 
				<div>
					Game has started<br/>
					Time Passed: {currentTime} milliseconds.<br/><br/>

					<button onClick={() => this.scoreTeam('A')}>Goal for Team {teamAName}</button>
					<button onClick={() => this.scoreTeam('B')}>Goal for Team {teamBName}</button>
					<button onClick={this.endGame}>End Game</button>
				</div>
			}

			{stage === 'end' && 
				<div>
					It was a good game. Here are the scores:
					<div>{teamAName} goals at</div>
					<ul>
						{scoreAJsx}
					</ul>

					<div>{teamBName} goals at</div>
					<ul>
						{scoreBJsx}
					</ul>

					<div>Winner is {(teamAGoals.length>teamBGoals.length)?teamAName:teamBName}</div>
				</div>
			}
		</div>
		);
	}
}

export default App;


