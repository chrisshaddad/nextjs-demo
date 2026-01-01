## Description

This project is for trying out [NextJS](https://nextjs.org/).

Please note this was created on a windows PC, while running on WSL2. Keep that in mind if you run into any issues.

### Prerequisites

This demo assumes you've already setup your development environment following the prisma demo repo (node, npm, etc). You will need at least Node 20+ to run this project.

### Up and Running

First, install the dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev
```

Access the application at `http://localhost:3000`.

### What you need to do

1. Switch books genre filtering from `useState` to query params.
2. Add pagination to the different listings available.
3. Add new pages for publishers:
   - Listing using a table view including filtering / sorting
   - Detail view for each publisher
4. Add a fake loading state when navigating between pages (use a skeleton loader or similar).

**Bonus Points:** Hide pages behind authentication (if you navigate to a page while not logged in, redirect to login page) - you can fake the actual authentication logic.
