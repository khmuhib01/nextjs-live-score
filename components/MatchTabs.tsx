'use client';

import React, {useState} from 'react';

const MatchTabs: React.FC<any> = ({data = {typeMatches: [], filters: {matchType: []}}}) => {
	console.log('data', data);

	const [activeTab, setActiveTab] = useState('International');
	const [filterStatus, setFilterStatus] = useState<'All' | 'Upcoming' | 'Live' | 'Completed'>('All');

	const handleTabClick = (matchType: string): void => setActiveTab(matchType);
	const handleFilterChange = (status: 'All' | 'Upcoming' | 'Live' | 'Completed') => setFilterStatus(status);

	interface MatchInfo {
		matchId: string;
		team1: {teamName: string};
		team2: {teamName: string};
		venueInfo: {ground: string; city: string};
		date: string;
		time: string;
		status: string;
	}

	interface MatchScore {
		team1Score?: {inngs1?: {runs?: number; wickets?: number}};
		team2Score?: {inngs1?: {runs?: number; wickets?: number}};
	}

	interface Match {
		matchInfo: MatchInfo;
		matchScore?: MatchScore;
	}

	const renderMatchDetails = (match: Match) => {
		const {matchInfo, matchScore} = match;
		const {team1, team2, venueInfo, date, time, status} = matchInfo;
		const team1Score = matchScore?.team1Score?.inngs1?.runs || 'N/A';
		const team1Wickets = matchScore?.team1Score?.inngs1?.wickets || 'N/A';
		const team2Score = matchScore?.team2Score?.inngs1?.runs || 'N/A';
		const team2Wickets = matchScore?.team2Score?.inngs1?.wickets || 'N/A';

		console.log('match', matchInfo);

		return (
			<div key={matchInfo.matchId} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
				<h3 className="text-lg font-semibold text-gray-800">
					{team1.teamName} vs {team2.teamName}
				</h3>
				<p className="text-gray-600">
					📍 {venueInfo.ground}, {venueInfo.city}
				</p>
				<p className="text-gray-600">
					📅 {new Date(Number(matchInfo.startDate)).toLocaleDateString('en-GB')} -{' '}
					{new Date(Number(matchInfo.endDate)).toLocaleDateString('en-GB')}
				</p>

				<p className={`font-semibold ${status.includes('Live') ? 'text-red-600' : 'text-gray-700'}`}>🟢 {status}</p>
				<p className="font-semibold text-blue-600">
					🏏 {team1.teamName}: {team1Score}/{team1Wickets} vs {team2.teamName}: {team2Score}/{team2Wickets}
				</p>
			</div>
		);
	};

	const filterMatches = (matches: Match[]) => {
		return matches.filter((match) => {
			const status = match.matchInfo.status.toLowerCase();
			if (filterStatus === 'All') return true;
			if (filterStatus === 'Upcoming') return status.includes('upcoming');
			if (filterStatus === 'Live') return status.includes('live');
			if (filterStatus === 'Completed') return status.includes('won') || status.includes('complete');
			return true;
		});
	};

	const renderTabContent = () => {
		const matches = data.typeMatches?.find((tm) => tm.matchType === activeTab)?.seriesMatches || [];
		const filteredMatches = matches.flatMap((series) =>
			series.seriesAdWrapper?.matches ? filterMatches(series.seriesAdWrapper.matches) : []
		);

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
				{filteredMatches.length > 0 ? (
					filteredMatches.map((match) => renderMatchDetails(match))
				) : (
					<p className="text-center text-gray-500 col-span-full">No matches found for the selected filter.</p>
				)}
			</div>
		);
	};

	return (
		<div className="p-4 bg-gray-100 rounded-lg">
			{/* Tabs */}
			<div className="flex space-x-2 border-b border-gray-300 pb-2">
				{data?.filters?.matchType?.map((matchType) => (
					<button
						key={matchType}
						className={`px-4 py-2 rounded-t-md font-semibold text-sm transition-all ${
							activeTab === matchType
								? 'bg-blue-600 text-white'
								: 'bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white'
						}`}
						onClick={() => handleTabClick(matchType)}
					>
						{matchType}
					</button>
				))}
			</div>

			{/* Filter Buttons */}
			<div className="flex space-x-2 mt-4">
				{['All', 'Upcoming', 'Live', 'Completed'].map((status) => (
					<button
						key={status}
						className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
							filterStatus === status
								? 'bg-green-500 text-white'
								: 'bg-gray-200 text-gray-600 hover:bg-green-400 hover:text-white'
						}`}
						onClick={() => handleFilterChange(status as 'All' | 'Upcoming' | 'Live' | 'Completed')}
					>
						{status}
					</button>
				))}
			</div>

			{/* Matches List */}
			{renderTabContent()}
		</div>
	);
};

export default MatchTabs;
