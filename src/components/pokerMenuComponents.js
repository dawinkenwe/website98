import React from 'react';
import './pokerMenuComponents.css'

export const BlindInfoGrid = ({ blindType, targetScore }) => {

	return (
		<div className="blindInfoDiv insetBox">
			<div className="blindText" style={{ gridArea: "banner" }}><b>{blindType === 'big' ? "Big Blind" : "Small Blind"}</b></div>
			<div className="blindChipImage" style={{ gridArea: "image" }}>chip</div>
			<div className="blindText" style={{ gridArea: "text" }}>Score at least:</div>
			<div className="chipImage" style={{ gridArea: "chip" }}>chip</div>
			<div className="targetScore" style={{ gridArea: "count" }}><b>{targetScore}</b></div>
		</div>
	)
}

export const RoundScoreGrid = ({ totalScore, computedScore, chips, multiplyer }) => {
	const scoreStyle = {
		display: "grid",
		gridTemplateAreas: `
			'total total total'
			'score score score'
			'chips x mult'
		`
	}

	return (
		<div className="scoreGrid insetBox" style={scoreStyle}>
			<div className="currentScore" style={{ gridArea: "total" }}>Round Score: <b>{totalScore}</b></div>
			<b className="computedScore" style={{ gridArea: "score" }}>{computedScore}</b>
			<div className="chips" style={{ gridArea: "chips" }}>{chips}</div>
			<b className="x" style={{ gridArea: "x" }}>x</b>
			<div className="mult" style={{ gridArea: "mult" }}>{multiplyer}</div>
		</div>
	)
}

export const InfoGrid = ({ hands, discards, money, ante, rounds }) => {
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
		<div className="infoGrid insetBox" style={ infoStyle }>
			<div className="hands" style={{gridArea: "hands"}}>Hands: {hands}</div>
			<div className="discards" style={{gridArea: "discards"}}>Discards: {discards}</div>
			<div className="money" style={{gridArea: "money"}}>Money: {money}</div>
			<div className="ante" style={{gridArea: "ante"}}>Ante: {ante}</div>
			<div className="rounds" style={{gridArea: "round"}}>Rounds: {rounds}</div>
		</div>
	)
}

export const RunInfoOptions = () => {
	return (
		<>
			<button className="runInfo">Run Info</button>
			<button className="options">Options</button>
		</>
	)
}