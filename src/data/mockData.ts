import { MOCK_COMMENTS as BaseComments } from '../components/modals/CommentModal';

// Type definition for reel data
export interface Reel {
    id: number;
    title: string;
    creator: string;
    subject: string;
    likes: number;
    saved: number;
    videoUrl: string;
    description: string;
}

// Reel Data
export const MOCK_REELS: Reel[] = [
    { 
        id: 1, 
        title: "Quantum Mechanics: The Double Slit", 
        creator: "Dr. Physics", 
        subject: "Science", 
        likes: 1200, 
        saved: 450,
        videoUrl: "https://placehold.co/1080x1920/10B981/ffffff?text=Video%201%0AQuantum%20Mechanics", // Placeholder video frame
        description: "A quick, visual breakdown of the most mind-bending experiment in science."
    },
    { 
        id: 2, 
        title: "Understanding the Golden Ratio in Art", 
        creator: "Art History Hub", 
        subject: "Art", 
        likes: 850, 
        saved: 210,
        videoUrl: "https://placehold.co/1080x1920/059669/ffffff?text=Video%202%0AGolden%20Ratio", // Placeholder video frame
        description: "From Da Vinci to modern design, discover the divine proportion."
    },
    { 
        id: 3, 
        title: "Python List Comprehensions in 60s", 
        creator: "Code Master", 
        subject: "Tech", 
        likes: 3400, 
        saved: 1100,
        videoUrl: "https://placehold.co/1080x1920/047857/ffffff?text=Video%203%0APython%20Lists", // Placeholder video frame
        description: "Write cleaner, faster Python code with this powerful trick."
    },
    { 
        id: 4, 
        title: "The Roman Republic's Collapse", 
        creator: "History Buff", 
        subject: "History", 
        likes: 920, 
        saved: 300,
        videoUrl: "https://placehold.co/1080x1920/155E75/ffffff?text=Video%204%0ARoman%20History", // Placeholder video frame
        description: "Analyzing the political and economic factors that doomed the Republic."
    },
];

// Mock Comment Data (Moved to CommentModal's internal state initialization 
// to avoid circular dependency in this structure. Keeping the type here.)
export interface Comment {
    id: number | string;
    user: string;
    text: string;
    time: string;
}

export type MockCommentsType = {
    [key: number]: Comment[];
}

export const MOCK_COMMENTS: MockCommentsType = {
    1: [ 
        { id: 101, user: "ScienceFan99", text: "This explained wave-particle duality better than my professor!", time: "2h ago" },
    ],
    2: [ 
        { id: 201, user: "ArtLover", text: "Beautifully demonstrated. I never saw the connection in the Mona Lisa before.", time: "4h ago" },
    ],
    3: [ 
        { id: 301, user: "CodeNewbie", text: "Super useful, thanks!", time: "1 day ago" },
        { id: 302, user: "ProDev", text: "Nice summary. Remember to avoid over-complicating comprehensions!", time: "30m ago" },
    ],
    4: [], 
};