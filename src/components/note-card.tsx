interface INoteCardDta {}

export default function NoteCard() {
  return (
    <div
      className="rounded-md bg-slate-800 p-6 space-y-3 relative  
                  overflow-hidden hover:ring-2 hover:ring-slate-500 
                  focus-visible:ring-2 focus-visible:ring-lime-400"
    >
      <span className="text-slate-200 text-base font-semibold">Há 2 dias</span>
      <p className="text-slate-400 text-sm leading-6 overflow-hidden text-ellipsis line-clamp-5">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet vero sit
        quisquam qui tempora dolores est alias, natus pariatur tenetur explicabo
        dignissimos exercitationem expedita ratione incidunt. Pariatur provident
        animi natus. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Amet vero sit quisquam qui tempora dolores est alias, natus pariatur
        tenetur explicabo dignissimos exercitationem expedita ratione incidunt.
        Pariatur provident animi natus.
      </p>

      <div
        className="absolute left-0 right-0 bottom-0 h-1/2 
                      bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"
      />
    </div>
  );
}
