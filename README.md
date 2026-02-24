# Smart Travel Scout 🚀

Smart Travel Scout is a premium, AI-powered discovery application that helps users find the perfect Sri Lankan travel experiences from a curated inventory. Built with Next.js and powered by OpenAI, it features a minimal, grounded AI interface that ensures suggestions are always accurate and relevant.

## Features
- **Grounded AI Discovery**: Natural language search strictly limited to the provided inventory.
- **Premium UI/UX**: Minimalist, high-end design with glassmorphism and smooth animations.
- **Why It Matches**: Transparent reasoning for every suggestion.
- **Post-hoc Validation**: Zod schema validation at the API boundary to prevent hallucinations.

---

## Technical Assessment Answers

### 1. The "Under the Hood" Moment
A specific technical hurdle I faced was ensuring the AI results were perfectly synced with our internal inventory types after the OpenAI call. Initially, the LLM would occasionally return slightly modified titles or tags. I debugged this by shifting the strategy: instead of asking the AI for full objects, I instructed it to return **only the primary IDs and a specific reasoning string**. I then implemented a join step in the Next.js Route Handler that map these IDs back to the source-of-truth `inventory.ts`. This guaranteed that data shown on the UI always matches the local dataset exactly, effectively eliminating "content" hallucinations.

### 2. The Scalability Thought
If we had 50,000 travel packages, passing the entire inventory into a single LLM prompt would exceed context limits and be prohibitively expensive. My approach would shift to a **RAG (Retrieval-Augmented Generation)** architecture:
1. **Pre-compute Embeddings**: Generate vector embeddings for all 50,000 items (based on title, tags, and location) and store them in a vector database (like Pinecone or pgvector).
2. **Hybrid Search**: When a user types a query, perform a vector similarity search (top-k) combined with metadata filters (price range, etc.) to narrow the 50,000 items down to the most relevant 10-20 candidates.
3. **LLM Reranking**: Send only those top candidates to the LLM for final reasoning and ranking. This maintains accuracy while keeping token usage (and costs) constant, regardless of total inventory size.

### 3. The AI Reflection
I used **Cursor (with Claude 3.5 Sonnet)** to help build this. One instance where it gave a "bad" suggestion was during the initial setup of the Next.js App Router API route. It suggested using a classic `res.status(200).json()` style response, which is for the Pages Router. In the App Router, this causes a runtime error because `NextResponse` is needed. I corrected this by overriding the suggestion and using the proper `NextResponse.json()` constructor, ensuring compatibility with the latest Next.js patterns.

---

## Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **AI**: Google Gemini Pro (via @google/generative-ai)
- **Validation**: Zod
- **Type Safety**: TypeScript

## Getting Started

First, set up your `.env.local`:
```bash
GEMINI_API_KEY=your_gemini_key_here
# OPENAI_API_KEY=your_openai_key_here (optional/commented in code)
```

Then, run the development server:
```bash
npm install
npm run dev
```

> [!TIP]
> You can get a free Gemini API key from the [Google AI Studio](https://aistudio.google.com/).
