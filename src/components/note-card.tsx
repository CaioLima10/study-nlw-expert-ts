import * as Dialog from "@radix-ui/react-dialog";

import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface INoteCardData {
  note: {
    date: Date;
    content: string;
  };
}

export default function NoteCard({ note: { content, date } }: INoteCardData) {
  return (
    <Dialog.Root>
      <Dialog.DialogTrigger
        className="rounded-md bg-slate-800 p-6 space-y-3 relative  
                    overflow-hidden hover:ring-2 hover:ring-slate-500 outline-none
                    focus-visible:ring-2 focus-visible:ring-lime-400"
      >
        <span className="text-slate-200 text-base font-semibold">
          {date.toISOString()}
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
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          max-w-[640px] w-full min-h-96 bg-slate-700 outline-none
          overflow-hidden rounded-md"
        >
          <Dialog.Close className="flex p-2 bg-slate-800 absolute right-0 top-0 hover:bg-red-400 group">
            <X size={22} className="text-slate-500 group-hover:text-red-200" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-slate-200 text-base font-semibold">
              {formatDistanceToNowStrict(date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-slate-400 text-sm leading-6 overflow-hidden text-ellipsis line-clamp-5">
              {content}
            </p>
          </div>
          <button
            type="button"
            className="w-full fixed bottom-0 text-base py-4 bg-slate-800 text-center text-slate-300 outline-none group"
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
