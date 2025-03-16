'use client';

import {useEffect, useState} from 'react';
import {RefreshCw} from 'lucide-react';

interface Score {
	r: number;
	w: number;
	o: number;
	inning: string;
}

interface Match {
	id: string;
	name: string;
	status: string;
	venue: string;
	date: string;
	score: Score[];
}

export default function Home() {
	const [matches, setMatches] = useState<Match[]>([]);
	const [fullResponse, setFullResponse] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchMatches = async () => {
		try {
			const API_KEY = '266b82e8-2da7-4ad6-99d8-9d6d16f71182';
			const response = await fetch(`https://api.cricapi.com/v1/matches?apikey=${API_KEY}&offset=0`);
			const data = await response.json();

			setFullResponse(data);

			console.log('API Response:', data);

			if (data.status !== 'success') {
				throw new Error(data.message || 'Failed to fetch matches');
			}

			if (Array.isArray(data.data)) {
				setMatches(
					data.data.map((match: any) => ({
						id: match.id,
						name: match.name,
						status: match.status,
						venue: match.venue,
						date: match.date,
						score: Array.isArray(match.score) ? match.score : [],
					}))
				);
			} else {
				throw new Error('Invalid data format received');
			}
			setError(null);
		} catch (err) {
			setError('Failed to fetch cricket matches. Please try again later.');
			setMatches([]); // Reset matches on error
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const initFetch = async () => {
			await fetchMatches();
		};

		initFetch();

		const interval = setInterval(fetchMatches, 60000); // Refresh every 30 seconds
		return () => clearInterval(interval);
	}, []);

	const handleRefresh = async () => {
		setLoading(true);
		await fetchMatches();
	};

	const formatScore = (score: Score) => {
		return `${score.inning}: ${score.r}/${score.w} (${score.o} overs)`;
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Live Cricket Scores</h1>
					<button
						onClick={handleRefresh}
						disabled={loading}
						className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
					>
						<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
						Refresh
					</button>
				</div>

				{fullResponse?.status === 'failure' && (
					<div className="bg-card text-card-foreground rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
						<pre className="text-sm text-muted-foreground">
							{fullResponse.reason} (You might have exceeded the API limit)
						</pre>
					</div>
				)}

				{fullResponse?.status && fullResponse.info === 'failure' && (
					<div className="bg-card text-card-foreground rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
						<pre className="text-sm text-muted-foreground">{JSON.stringify(fullResponse.info, null, 2)}</pre>
					</div>
				)}

				{loading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
					</div>
				) : error ? (
					<div className="bg-destructive/10 text-destructive p-4 rounded-md">{error}</div>
				) : matches.length === 0 ? (
					<div className="text-center text-gray-500 py-8">No matches available at the moment</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{matches.map((match) => (
							<div
								key={match.id}
								className="bg-card text-card-foreground rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
							>
								<h3 className="font-semibold text-lg mb-2">{match.name}</h3>
								<div className="space-y-2 text-sm text-muted-foreground">
									<p>{match.venue}</p>
									<p>{new Date(match.date).toLocaleDateString()}</p>
									<div className="mt-4">
										{match.score?.map((score, index) => (
											<p key={index} className="text-base text-foreground">
												{formatScore(score)}
											</p>
										))}
									</div>
									<p className="mt-4 text-base font-medium text-primary">{match.status}</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
