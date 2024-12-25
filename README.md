# Bandit Leaderboard

A simple React component that displays a leaderboard using the Bandit API. Shows user rankings, wallet addresses and XP scores in a paginated table with search functionality.

## Setup

1. Clone the repository
2. Create a `.env.local` file in the root directory with:
    ```bash
    NEXT_PUBLIC_LEADERBOARD_API_KEY=your_api_key_here
    ```
3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
4. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Features

- Paginated display of leaderboard data
- Search filtering by wallet address  
- Copy wallet address functionality
- Loading states and error handling
- Responsive design

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_LEADERBOARD_API_KEY` - Your Bandit API key

Create a `.env.local` file based on `.env.example` and add your API key. The `.env.local` file is gitignored for security.

## Built With

- React
- Next.js
- Tailwind CSS
- Lucide React Icons

## License

This project is licensed under the MIT License.
