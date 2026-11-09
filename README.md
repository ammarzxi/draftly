# Improvs

Improvs is a document workspace I'm building with Next.js. The idea is to keep writing and organizing notes in one place, without making the app feel crowded.

## What it can do

- Create documents and folders
- Write and edit documents in Markdown
- Preview Markdown while working
- Keep documents inside folders
- Star documents and folders
- Browse recently updated documents
- Move items to Trash, restore them, or delete them permanently

## Built with

- Next.js 16
- React 19
- Tailwind CSS 4
- CodeMirror
- React Markdown
- Lucide React

## Run it locally

You'll need Node.js and npm installed.

```bash
git clone https://github.com/ammarzxi/improvs.git
cd improvs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

To create a production build:

```bash
npm run build
npm start
```

## Project layout

```text
app/
├── components/
│   ├── home/
│   ├── layout/
│   │   └── documents/
│   ├── recents/
│   ├── trash/
│   └── ui/
├── context/
├── data/
├── hooks/
├── services/
└── utils/
```

A quick look at where things live:

- `components/` contains the app's pages and UI.
- `context/GlobalVars.js` holds shared app state.
- `services/items.js` contains the functions that add, update, delete, and restore items.
- `hooks/useDocumentActions.js` keeps document and folder actions reusable.
- `data/documents.js` provides the starting sample documents.
- `utils/` contains small helper functions.

## Where things stand

The app currently keeps its data in React state, starting from the sample data in `app/data/documents.js`. Changes are available while the app is running, but they aren't saved to a database yet, so refreshing the page resets them.

Improvs is still being worked on. The structure and features will keep changing as I build it out.
