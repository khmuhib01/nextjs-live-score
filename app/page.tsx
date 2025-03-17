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
			setMatches([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const initFetch = async () => {
			await fetchMatches();
		};

		initFetch();

		const interval = setInterval(fetchMatches, 60000); // Refresh every minute
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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
			<div className="max-w-7xl mx-auto py-10 px-6">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 tracking-wide">🏏 Live Cricket Scores</h1>
					<button
						onClick={handleRefresh}
						disabled={loading}
						className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
					>
						<RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
						Refresh
					</button>
				</div>

				{/* API Limit Message */}
				{fullResponse?.status === 'failure' && (
					<div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-md mb-6">
						<strong>⚠ API Limit Reached:</strong> {fullResponse.reason}
					</div>
				)}

				{loading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
					</div>
				) : error ? (
					<div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-md">{error}</div>
				) : matches.length === 0 ? (
					<div className="text-center text-gray-500 py-8 text-lg">No matches available at the moment</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{matches.map((match) => (
							<div
								key={match.id}
								className="bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:-translate-y-1"
							>
								<h3 className="font-bold text-xl mb-3">{match.name}</h3>
								<div className="space-y-2 text-sm">
									<p className="font-medium text-gray-600">📍 {match.venue}</p>
									<p className="font-medium text-gray-600">📅 {new Date(match.date).toLocaleDateString()}</p>
									<div className="mt-4 space-y-1">
										{match.score?.map((score, index) => (
											<p key={index} className="text-base text-gray-900 font-semibold">
												{formatScore(score)}
											</p>
										))}
									</div>
									<p
										className={`mt-4 text-lg font-semibold ${
											match.status.includes('Live') ? 'text-red-600' : 'text-green-600'
										}`}
									>
										🔴 {match.status}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
