import { useState } from "react";
import { getAllChallenges } from "../api/api";
import { defer, useLoaderData } from "react-router-dom";
import ChallengeCard from "../components/ChallengeCard";
import { GrPowerReset } from "react-icons/gr";

export const loadChallenges = async () => {
  const challenges = await getAllChallenges();
  return defer({ challenges });
};

// const filesWithTests = {
//   "/styles.css": {
//     code: `body {
//   font-family: sans-serif;
//   -webkit-font-smoothing: auto;
//   -moz-font-smoothing: auto;
//   -moz-osx-font-smoothing: grayscale;
//   font-smoothing: auto;
//   text-rendering: optimizeLegibility;
//   font-smooth: always;
//   -webkit-tap-highlight-color: transparent;
//   -webkit-touch-callout: none;
// }

// h1 {
//   font-size: 1.5rem;
// }`,
//   },
//   "/App.js": {
//     code: `export default function App() {
// return <h1>Doggy Directory</h1>
// }
// `,
//   },
//   "/index.js": {
//     code: `import React, { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./styles.css";

// import App from "./App";

// const root = createRoot(document.getElementById("root"));
// root.render(
// <StrictMode>
//   <App />
// </StrictMode>
// );`,
//   },
//   "/public/index.html": {
//     code: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>
//   <div id="root"></div>
// </body>
// </html>`,
//   },
//   "/tests/setup.js": {
//     code: `
//     import {expect, afterEach} from 'vitest'
//     import {cleanup} from '@testing-library/react'
//     import matchers from '@testing-library/jest-dom/matchers'

//     expect.extend(matchers)

//     afterEach(() => {
//       cleanup();
//     })
//     `,
//   },
//   "/tests/App.test.jsx": {
//     code: `
//     import {render, screen} from '@testing-library/react'
//     import App from '../App.js'
//     import '@testing-library/jest-dom/extend-expect';

//       test('renders headline', () => {
//         render(<App />);

//         expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
//       })

//     `,
//   },
//   "/add.ts": {
//     code: `export const add = (a,b) => a + b;`,
//   },
//   "/package.json": {
//     code: JSON.stringify({
//       scripts: {
//         start: "react-scripts start",
//       },
//       dependencies: {
//         react: "^18.0.0",
//         "react-dom": "^18.0.0",
//         "react-scripts": "^5.0.0",
//         "@testing-library/jest-dom": "^5.17.0",
//         "@testing-library/react": "^14.0.0",
//         jsdom: "^22.1.0",
//         vitest: "^0.33.0",
//       },
//       main: "/index.js",
//     }),
//   },
// };

const Challenges = () => {
  const { challenges } = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  // Search challenges by title or author
  const searchedChallenges = challenges?.data.filter((challenge) => {
    const titleMatch = challenge.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = challenge.challengeCategory
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const difficultyMatch = challenge.difficultyLevel
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || categoryMatch || difficultyMatch;
  });

  // Extract unique categories from the challenge data
  const categories = [
    ...new Set(
      challenges?.data.map((challenge) => challenge.challengeCategory)
    ),
  ];

  // Extract unique difficulties from the challenge data
  const difficulties = [
    ...new Set(challenges?.data.map((challenge) => challenge.difficultyLevel)),
  ];

  // Filter challenges by category
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter challenges by publication difficulty
  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const filteredChallengesByCategoryAndDifficulty = searchedChallenges?.filter(
    (challenge) => {
      const categoryMatch =
        !selectedCategory ||
        challenge.challengeCategory.toLowerCase() ===
          selectedCategory.toLowerCase();
      const difficultyMatch =
        !selectedDifficulty ||
        challenge.difficultyLevel.toLowerCase() ===
          selectedDifficulty.toLowerCase();
      return categoryMatch && difficultyMatch;
    }
  );

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedDifficulty("");
  };

  return (
    <div>
      <div className="grid lg:grid-cols-10 grid-cols-1 gap-4 lg:p-12 p-4 bg-green-200">
        <div className="col-span-6">
          <input
            type="text"
            placeholder="Search by Title or Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full"
          />
        </div>

        <div className="flex lg:gap-4 gap-2 col-span-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 "
          >
            <option value="">Category</option>
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">Difficulty</option>
            {difficulties.map((difficulty, i) => (
              <option key={i} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>

          <button
            onClick={resetFilters}
            className="btn bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 border-none"
          >
            <span className="hidden lg:flex">Reset Filters</span>
            <GrPowerReset className="text-xl"></GrPowerReset>
          </button>
        </div>
      </div>
      <div className=" bg-green-100">
        <div className=" p-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6 ">
          {challenges?.success &&
            filteredChallengesByCategoryAndDifficulty?.map((challenge) => (
              <ChallengeCard
                key={challenge._id}
                challenge={challenge}
              ></ChallengeCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
