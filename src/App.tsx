import { useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import NewNoteCard from "./components/new-note-card";
import NoteCard from "./components/note-card";

interface INoteData {
  id: number;
  content: string;
  date: Date;
}

function App() {
  const [notes, setNotes] = useState<INoteData[]>([]);

  function onNoteCreated(content: string) {
    const newNotes = {
      id: Math.random(),
      date: new Date(),
      content: content,
    };

    setNotes([newNotes, ...notes]);
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo_nlw_expert" className="w-32" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full text-3xl tracking-tight bg-transparent 
                    text-slate-500 placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="w-full h-px bg-slate-500" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default App;
