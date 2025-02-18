import React from 'react';
import './pokerMenuComponents.css'

export const InfoTable = ({hands, discards, money, ante, rounds}) => {
	const infoStyle = {
		display: "grid",
		gridTemplateAreas: `
			'hands discards'
			'money money'
			'ante round'
			`,
		gap: "10px",

	}
	return (
		<div className="infoTable" style={ infoStyle }>
			<div className="hands" style={{gridArea: "hands"}}>Hands: {hands}</div>
			<div className="discards" style={{gridArea: "discards"}}>Discards: {discards}</div>
			<div className="money" style={{gridArea: "money"}}>Money: {money}</div>
			<div className="ante" style={{gridArea: "ante"}}>Ante: {ante}</div>
			<div className="rounds" style={{gridArea: "round"}}>Rounds: {rounds}</div>
		</div>
	)
}

export const RunInfoOptions = () => {

}