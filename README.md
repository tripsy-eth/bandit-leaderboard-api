# Bandit Leaderboard Component

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

## Usage

Import and use the LeaderboardComponent with your specific action ID:

```jsx
import LeaderboardComponent from '@/components/leaderboard';

// In your page or component:
<LeaderboardComponent actionId="your-action-id-here" />
```

The `actionId` prop is required and determines which leaderboard data to display.

## Features

- Configurable leaderboard via actionId prop
- Paginated display of leaderboard data
- Search filtering by wallet address  
- Copy wallet address functionality
- Loading states and error handling
- Responsive design
- Statistics summary (Average XP, Highest XP, Total Participants)
- Quick page navigation with enter key support
- Informative tooltips for better user guidance

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_LEADERBOARD_API_KEY` - Your Bandit API key

Create a `.env.local` file based on `.env.example` and add your API key. The `.env.local` file is gitignored for security.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| actionId | string | Yes | Unique identifier for the specific leaderboard to display |

## Interactive Features

### Statistics Summary
Displays key metrics at the top of the leaderboard:
- Average XP across all participants
- Highest XP score
- Total number of participants

### Navigation
- Quick jump to any page using the input field
- Enter key support for page navigation
- Helpful tooltip explaining the navigation feature
- Previous/Next pagination buttons

### Data Interaction
- Copy wallet addresses with one click
- Search functionality for wallet addresses
- Responsive table layout

## Built With

- React
- Next.js
- Tailwind CSS
- Lucide React Icons

## License

This project is licensed under the MIT License.
