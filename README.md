# Cricket Live Score App

A real-time cricket score tracking application built with Next.js that provides live updates for ongoing cricket matches using the CricAPI.

![Cricket Live Score App](https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

- 🏏 Real-time cricket match updates
- 🔄 Auto-refresh every 30 seconds
- 📱 Responsive design for all devices
- ⚡ Fast and efficient data loading
- 🎯 Error handling and loading states
- 🎨 Modern and clean UI with Tailwind CSS

## Tech Stack

- [Next.js 13](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons
- [CricAPI](https://cricketdata.org/) - Cricket data provider

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager
- CricAPI key (get it from [CricAPI](https://cricketdata.org/))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cricket-live-score.git
cd cricket-live-score
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout component
│   └── page.tsx       # Home page component
├── components/
│   └── ui/           # UI components from shadcn/ui
├── lib/
│   └── utils.ts      # Utility functions
├── public/           # Static assets
└── types/           # TypeScript type definitions
```

## Features Explanation

### Live Score Updates

- Fetches match data from CricAPI
- Updates automatically every 60 seconds
- Manual refresh option available

### Match Information

- Match name and status
- Venue and date
- Current score with overs
- Multiple innings support

### Error Handling

- API error handling
- Loading states
- Fallback UI for no matches
- Network error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CricAPI](https://cricketdata.org/) for providing the cricket data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the amazing React framework
