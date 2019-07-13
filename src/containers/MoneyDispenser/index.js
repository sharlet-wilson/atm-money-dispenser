import React, { Component } from 'react';
import MoneyDispenserView from '../../components/MoneyDispenser'

class MoneyDispenser extends Component {
	state = {
		availableDenominations: [1,2,5,10,20,50,100,200,500,2000],
		dispensedNotes: [],
	}

	handleSubmit = (amount) => {
		let remainingAmount = +amount;
		let currentDenominationIndex = this.state.availableDenominations.length - 1;
		const dispensedNotes = [];
		while (remainingAmount) {
			const numberOfNotes = Math.floor(remainingAmount / this.state.availableDenominations[currentDenominationIndex]);
			if (numberOfNotes > 0) {
				remainingAmount = remainingAmount % this.state.availableDenominations[currentDenominationIndex];
			}
			dispensedNotes.push({
				denomination: this.state.availableDenominations[currentDenominationIndex],
				numberOfNotes,
			})
			--currentDenominationIndex;
		}
		this.setState({ dispensedNotes: dispensedNotes.reverse() });
	}

	render() {
		return(<MoneyDispenserView dispensedNotes={this.state.dispensedNotes} handleSubmit={this.handleSubmit} />);
	}
}

export default MoneyDispenser;

