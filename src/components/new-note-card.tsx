import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface INewNoteCardData {
  onNoteCreated: (content: string) => void;
}

export default function NewNoteCard({ onNoteCreated }: INewNoteCardData) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState("");

  function handleClick() {
    setShouldShowOnBoarding(false);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const contentValue = event.target.value;

    setContent(contentValue);

    if (contentValue.length === 0) {
      setShouldShowOnBoarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    if (content.length < 3) {
      toast.error("necessario ter 3 digitos!!");
      return;
    }

    onNoteCreated(content);

    toast.success("nota criada com sucesso!!");
  }

  return (
    <Dialog.Root>
      <Dialog.DialogTrigger
        className="flex flex-col text-left rounded-md bg-slate-700 p-5 space-y-3                     
                    overflow-hidden hover:ring-2 hover:ring-slate-500 outline-none
                    focus-visible:ring-2 focus-visible:ring-lime-400 "
      >
        <span className="text-slate-50 text-base font-semibold">
          Adicionar nota
        </span>
        <p className="text-slate-400 text-sm leading-6">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
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

          <form onSubmit={handleSaveNote}>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-slate-200 text-sm font-semibold">
                Adicionar nota.
              </span>
              {shouldShowOnBoarding ? (
                <div>
                  <p className="text-slate-400 text-sm leading-6 overflow-hidden text-ellipsis line-clamp-5">
                    Comece{" "}
                    <button className="text-lime-400 font-semibold hover:underline ">
                      gravando uma nota
                    </button>{" "}
                    em áudio ou se preferir{" "}
                    <button
                      onClick={handleClick}
                      className="text-lime-400 font-semibold hover:underline"
                    >
                      utilize apenas texto
                    </button>
                    .
                  </p>
                </div>
              ) : (
                <textarea
                  onChange={handleContentChange}
                  className="flex flex-1 h-full resize-none text-sm leading-6
                text-slate-400 bg-transparent outline-none"
                  placeholder="Escreva sua nota..."
                ></textarea>
              )}
            </div>
            <button
              type="submit"
              className="w-full fixed bottom-0 text-base py-4 bg-lime-400 
                        text-center text-slate-900 font-semibold outline-none hover:bg-lime-500 duration-200 group"
            >
              Salvar nota.
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
