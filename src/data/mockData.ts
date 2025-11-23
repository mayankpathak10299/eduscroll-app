// src/data/mockData.ts

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
    // New fields for the "Continue Learning" CTA
    externalLink?: string; 
    externalLinkText?: string;
}

// Reel Data - Focuses ONLY on TECH subjects
export const MOCK_REELS: Reel[] = [
    { 
        id: 5, 
        title: "Learn about OOPs", 
        creator: "Code Master", 
        subject: "Tech", 
        likes: 500, 
        saved: 150,
        videoUrl: "https://placehold.co/1080x1920/334155/ffffff?text=Video%201%0ALearn+about+OOPs", 
        description: "Introduction to Object-Oriented Programming principles and fundamental syntax."
    },
    { 
        id: 8, 
        title: "Prerequistic before you start coding", 
        creator: "Code Master", 
        subject: "Tech", 
        likes: 1200, 
        saved: 350,
        videoUrl: "https://placehold.co/1080x1920/474747/ffffff?text=Video%202%0APrereqs", 
        description: "Essential tools, mindset, and basic concepts you need before writing your first line of code."
    },
    { 
        id: 9, // NEW COURSE ID
        title: "Basic of Git", // NEW COURSE TITLE
        creator: "Dev Ops Guy", 
        subject: "Tech", 
        likes: 1500, 
        saved: 600,
        videoUrl: "https://placehold.co/1080x1920/6495ED/ffffff?text=Video%203%0AGit+Basics", 
        description: "Master the fundamental commands and workflow of Git for version control."
    },
    { 
        id: 3, 
        title: "Python List Comprehensions in 60s", 
        creator: "Code Master", 
        subject: "Tech", 
        likes: 3400, 
        saved: 1100,
        videoUrl: "https://placehold.co/1080x1920/047857/ffffff?text=Video%204%0APython%20Lists", 
        description: "Write cleaner, faster Python code with this powerful trick."
    },
    { 
        id: 6, 
        title: "Understanding Asynchronous JavaScript", 
        creator: "Web Dev Expert", 
        subject: "Tech", 
        likes: 2100, 
        saved: 780,
        videoUrl: "https://placehold.co/1080x1920/475569/ffffff?text=Video%205%0AAsync+JS", 
        description: "Promises, async/await, and why they matter for modern web apps."
    },
    { 
        id: 7, 
        title: "Git Basics: Commit and Branching", 
        creator: "Dev Ops Guy", 
        subject: "Tech", 
        likes: 980, 
        saved: 400,
        videoUrl: "https://placehold.co/1080x1920/64748B/ffffff?text=Video%206%0AGit+Basics", 
        description: "Master the fundamentals of version control for collaborative projects."
    },
];

// Type definition for comment data
export interface Comment {
    id: number | string;
    user: string;
    text: string;
    time: string;
}

export type MockCommentsType = {
    [key: number]: Comment[];
}

// --- QUIZ DATA ---

export interface Quiz {
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

export const MOCK_QUIZZES: { [key: number]: Quiz } = {
    // Quiz for the OOPs course (ID 5)
    5: {
        question: "Which of the following is NOT a fundamental principle of OOP?",
        options: [
            "Encapsulation",
            "Polymorphism",
            "Inheritance",
            "Normalization" 
        ],
        correctAnswerIndex: 3,
    },
    // Quiz for Prerequisite course (ID 8)
    8: {
        question: "Which tool is used for tracking changes in software development?",
        options: [
            "IDE",
            "Git", 
            "Compiler",
            "Operating System"
        ],
        correctAnswerIndex: 1,
    },
    // NEW Quiz for Git Basics course (ID 9)
    9: {
        question: "What command saves changes to the local repository history?",
        options: [
            "git push",
            "git pull",
            "git commit", // Correct Answer
            "git branch"
        ],
        correctAnswerIndex: 2,
    },
    // Quiz for Python Lists (ID 3)
    3: {
        question: "List comprehension in Python returns what type of object?",
        options: [
            "A dictionary",
            "A tuple",
            "A list", 
            "A generator"
        ],
        correctAnswerIndex: 2,
    },
};

// --- SYLLABUS DATA ---

export interface SyllabusItem {
    title: string;
    duration: string;
    completed: boolean;
    reelId: number;
}

export const MOCK_SYLLABUS: { [key: number]: SyllabusItem[] } = {
    5: [ // Learn about OOPs (ID 5)
        { title: "Intro to Objects & Classes", duration: "60 sec", completed: true, reelId: 501 },
        { title: "What is Encapsulation?", duration: "60 sec", completed: false, reelId: 502 },
        { title: "Inheritance Fundamentals", duration: "60 sec", completed: false, reelId: 503 },
        { title: "Polymorphism Explained", duration: "60 sec", completed: false, reelId: 504 },
        { title: "Abstraction & Interfaces", duration: "60 sec", completed: false, reelId: 505 },
        { title: "OOPs in Python vs Java", duration: "60 sec", completed: false, reelId: 506 },
        { title: "Method Overloading vs. Overriding", duration: "60 sec", completed: false, reelId: 507 },
        { title: "Static vs. Instance Members", duration: "60 sec", completed: false, reelId: 508 },
        { title: "Quiz: OOPs Principles", duration: "60 sec", completed: false, reelId: 509 },
        { title: "Final Review & Summary", duration: "60 sec", completed: false, reelId: 510 },
    ],
    8: [ // Prerequistic before you start coding (ID 8)
        { title: "Why VS Code?", duration: "60 sec", completed: true, reelId: 801 },
        { title: "Basic Terminal Commands", duration: "60 sec", completed: false, reelId: 802 },
        { title: "What is a Variable?", duration: "60 sec", completed: false, reelId: 803 },
        { title: "Algorithms and Logic", duration: "60 sec", completed: false, reelId: 804 },
        { title: "Version Control (Git)", duration: "60 sec", completed: false, reelId: 805 },
        { title: "Basic Debugging", duration: "60 sec", completed: false, reelId: 806 },
        { title: "Understanding Data Types", duration: "60 sec", completed: false, reelId: 807 },
        { title: "Flowcharts & Pseudocode", duration: "60 sec", completed: false, reelId: 808 },
        { title: "Quiz: Prereqs", duration: "60 sec", completed: false, reelId: 809 },
        { title: "Setup Review", duration: "60 sec", completed: false, reelId: 810 },
    ],
    9: [ // NEW Syllabus for Basic of Git (ID 9)
        { title: "Git vs GitHub vs GitLab", duration: "60 sec", completed: false, reelId: 901 },
        { title: "Initializing a Repository", duration: "60 sec", completed: false, reelId: 902 },
        { title: "The Three States (Working, Staging, Repo)", duration: "60 sec", completed: false, reelId: 903 },
        { title: "Git Add and Git Commit", duration: "60 sec", completed: false, reelId: 904 },
        { title: "Creating and Switching Branches", duration: "60 sec", completed: false, reelId: 905 },
        { title: "Merging Branches (Fast-forward)", duration: "60 sec", completed: false, reelId: 906 },
        { title: "Git Push and Git Pull", duration: "60 sec", completed: false, reelId: 907 },
        { title: "Conflict Resolution Basics", duration: "60 sec", completed: false, reelId: 908 },
        { title: "Quiz: Git Fundamentals", duration: "60 sec", completed: false, reelId: 909 },
        { title: "Final Project Workflow", duration: "60 sec", completed: false, reelId: 910 },
    ],
};