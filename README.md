# 📚🐶 Stonewaters Library

Deployed at https://pro0217-bookrecommender.onrender.com/ using Render

Your local library simulation app, here for all your book recommendation needs!

## 😏 What you can expect...

- Book recommendations based solely on _your_ input, no prompts barred. Fukuyama fan? No problem. Visiting Vienna next month and need a heads-up on tourist traps? We've got you. A aeroplane afficionado with a penchant for Pepper Jack cheese? You've come to the right place.
- A personal reading list, curated by your own good self by liking books our resident librarian Oskar brings back.
- Smart recommendations generated based on the content of your reading list.
- "Friends" feature, allowing you to add other users as friends (and snoop(y) on their reading lists too!)
- A personal inbox, informing you of new friend requests received and keeping you updated on the status of friend requests you have sent.

## 🛠️ Tech Stack

- **Backend**: Node.js with Express
- **API Integration**:
    - OpenAI API for book recommendations
    - Google Books API for book covers
- **"Database"**: local JSON file served by JSON-Server
- **Data (User ID) Persistence**: localStorage object
- **Input Validation**: Zod schema validation

## 🚀 Commencing countdown, engines on!

1. Quick, clone the repository!

```bash
git clone https://github.com/yourusername/Pro0217-BookRecommender.git
```

2. Install all those dependencies...

```bash
npm install
```

3. Create a `.env` file for your OpenAI API key, very important!

```env
OPENAI_KEY=your_openai_api_key
```

4. Check you've got an ample supply of Jacob's cream crackers...

```bash
npm run have-we-forgotten-the-crackers
```

5. Fire up the server!

```bash
npm run start
```

6. Navigate to a browser of your choosing, sit back and enjoy the ride! 😁

## 🎯 API Endpoints

See the full API documentation [here](docs/api.md).

## 🔄 Data Flow

```mermaid
graph TD
    A[Client Request] --> B[Express Server]
    B --> C{Route Handler}
    C -->|User Operations| D[User Controller]
    C -->|Book Recommendations| E[OpenAI API]
    C -->|Book Covers| F[Google Books API]
    D --> G[JSON Server Database]
    D --> H[bloodyBrilliant Function]
    H --> G
    E --> I[AI Generated Recommendations]
    F --> J[Book Cover Images]
    G --> K[User Data Response]
    I --> L[Client Response]
    J --> L
    K --> L
    L --> M[Frontend Display]
    
    style H fill:#ffeb3b,stroke:#f57f17,stroke-width:2px
    style H stroke-dasharray: 5 5
```

## 🔧 Troubleshooting

### Common Issues

- **OpenAI API Key Issues**: Ensure your `.env` file contains a valid `OPENAI_KEY`
- **Port Conflicts**: The default port may be in use. Check console output for the actual port
- **JSON Server Database**: If user data seems corrupted, check the local JSON file integrity
- **Friend Requests Not Working**: Verify that user IDs are properly stored in localStorage

### Known Code Issues

⚠️ **Note**: The `bloodyBrilliant()` function in `userController.js` currently duplicates the functionality of `getUsers()`. This redundancy should be reviewed and potentially refactored in future updates.

---

Happy reading! Oskar 🐾