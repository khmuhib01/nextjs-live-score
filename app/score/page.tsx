'use client';

import React, {useEffect, useState} from 'react';
import MatchTabs from '@/components/MatchTabs';

const ScorePage = () => {
	const [matches, setMatches] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMatches = async () => {
			try {
				const response = await fetch('https://cricket-live-scores.p.rapidapi.com/matches/v1/recent', {
					method: 'GET',
					headers: {
						'X-RapidAPI-Key': '5d4753c213mshc51869ae8e4c875p156e77jsna75c3b55079b', // Replace with your key
						'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
					},
				});

				const data = await response.json();
				console.log('API Response:', data);

				setMatches(data);
			} catch (err) {
				console.error('Error fetching matches:', err);
				setError('Failed to fetch cricket matches. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchMatches();
	}, []);

	return (
		<div>
			<h1>Live Cricket Scores</h1>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{matches && <MatchTabs data={matches} />}
		</div>
	);
};

export default ScorePage;
