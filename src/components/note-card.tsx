import * as Dialog from "@radix-ui/react-dialog";

import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, FilePenLine, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface INoteCardData {
  note: {
    id: string;
    date: Date;
    content: string;
  };

  handleNoteDelete: (id: string) => void;
  handleNoteEdit: (id: string, newContent: string) => void;
}

export default function NoteCard({
  note: { content, date, id },
  handleNoteDelete,
  handleNoteEdit,
}: INoteCardData) {
  function handleDelete(id: string) {
    if (!id) return;

    handleNoteDelete(id);
    toast.success("Notação deletada com sucesso");
  }

  const [editedContent, setEditedContent] = useState(content);
  const [isEditedNote, setIsEditedNote] = useState(true);

  function handleEditedNote() {
    handleNoteEdit(id, editedContent);
    setIsEditedNote(true);
    if (editedContent === content) {
      return;
    }
    toast.success("notação atualizada com sucesso!");
  }

  function openEditedNote() {
    setIsEditedNote(false);
  }

  return (
    <Dialog.Root>
      <Dialog.DialogTrigger
        className="rounded-md bg-slate-800 p-6 space-y-3 relative  
                    overflow-hidden hover:ring-2 hover:ring-slate-500 outline-none
                    focus-visible:ring-2 focus-visible:ring-lime-400"
      >
        <span className="text-slate-200 text-base font-semibold">
          {formatDistanceToNowStrict(date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-slate-400 text-sm leading-6 overflow-hidden text-ellipsis line-clamp-5">
          {content}
        </p>

        <div
          className="absolute left-0 right-0 bottom-0 h-1/2 
                        bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"
        />
      </Dialog.DialogTrigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/40" />
        <Dialog.Content
          className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
          md:max-w-[640px] w-full min-h-96 bg-slate-700 outline-none
          overflow-hidden rounded-md"
        >
          <Dialog.Close className="flex p-2 bg-slate-800 absolute right-0 top-0 hover:bg-red-400 group z-10">
            <X size={22} className="text-slate-500 group-hover:text-red-200" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5 relative">
            <span className="text-slate-200 text-base font-semibold">
              {formatDistanceToNowStrict(date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>

            {!isEditedNote ? (
              <>
                <textarea
                  className="bg-slate-600 text-slate-200 w-full min-h-56 resize-none outline-none
                              focus-visible:ring-2 focus-visible:ring-lime-400  overflow-hidden"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button
                  className="bg-lime-500 py-4 w-64 fixed bottom-0 right-0 flex items-center justify-center gap-2"
                  onClick={handleEditedNote}
                >
                  Salvar Edição <Check />
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-slate-800 py-4 w-64 fixed bottom-0 right-0 text-slate-300 flex items-center justify-center gap-2"
                  onClick={openEditedNote}
                >
                  Editar{" "}
                  <span className="text-lime-500">
                    <FilePenLine />
                  </span>
                </button>
                <p className="text-slate-300">{content}</p>
              </>
            )}
          </div>
          <button
            type="button"
            className="w-64 fixed bottom-0 text-base py-4 bg-slate-800 text-center text-slate-300 outline-none group"
            onClick={() => handleDelete(id)}
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar sua nota
            </span>{" "}
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
