import { ChangeEvent, useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import NewNoteCard from "./components/new-note-card";
import NoteCard from "./components/note-card";
import { Bird } from "lucide-react";

interface INoteData {
  id: string;
  content: string;
  date: Date;
}

function App() {
  const [notes, setNotes] = useState<INoteData[]>(() => {
    const noteOnStorage = localStorage.getItem("notes");

    if (noteOnStorage) {
      return JSON.parse(noteOnStorage);
    }

    return [];
  });

  const [search, setSearch] = useState("");

  function onNoteCreated(content: string) {
    const newNotes = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content,
    };

    const dataNotes = [newNotes, ...notes];

    setNotes(dataNotes);

    localStorage.setItem("notes", JSON.stringify(dataNotes));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const noteFiltered = () => {
    if (search !== "") {
      return notes.filter((note) => note.content.includes(search));
    } else {
      return notes;
    }
  };

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo_nlw_expert" className="w-32" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          onChange={handleSearch}
          value={search}
          className="w-full text-3xl tracking-tight bg-transparent 
                    text-slate-500 placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="w-full h-px bg-slate-500" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {(search.length === 0 && (
          <>
            {noteFiltered().map((note: INoteData) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </>
        )) || (
          <span className="flex flex-col w-full items-center justify-center text-slate-500 text-xl">
            <Bird size={110} />
            Nenhuma anotação encontrada!
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
