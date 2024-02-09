import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface INewNoteCardData {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export default function NewNoteCard({ onNoteCreated }: INewNoteCardData) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState("");

  const [isRecording, setIsRecording] = useState(false);

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
    setContent("");
    setShouldShowOnBoarding(true);

    toast.success("nota criada com sucesso!!");
  }

  function handleClickIsRecording() {
    setIsRecording(true);

    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Infelismente seu navegador não suporta a API de gravação!");
      return;
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setShouldShowOnBoarding(false);
      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleIsRecording() {
    setIsRecording(false);

    speechRecognition?.stop();
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
          className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
          md:max-w-[640px] w-full min-h-96 bg-slate-700 outline-none
          overflow-hidden rounded-md"
        >
          <Dialog.Close className="flex p-2 bg-slate-800 absolute right-0 top-0 hover:bg-red-400 group">
            <X size={22} className="text-slate-500 group-hover:text-red-200" />
          </Dialog.Close>

          <form>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-slate-200 text-sm font-semibold">
                Adicionar nota.
              </span>
              {shouldShowOnBoarding ? (
                <div>
                  <p className="text-slate-400 text-sm leading-6 overflow-hidden text-ellipsis line-clamp-5">
                    Comece{" "}
                    <button
                      type="button"
                      onClick={handleClickIsRecording}
                      className="text-lime-400 font-semibold hover:underline "
                    >
                      gravando uma nota
                    </button>{" "}
                    em áudio ou se preferir{" "}
                    <button
                      type="button"
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
                  value={content}
                />
              )}
            </div>
            {isRecording ? (
              <button
                onClick={handleIsRecording}
                type="button"
                className="w-full fixed flex items-center justify-center gap-3 bottom-0 text-base py-4 bg-slate-900 
                        text-center text-slate-200 font-semibold outline-none hover:bg-slate-800 duration-200 group"
              >
                <span className="relative size-3 rounded-full bg-red-500">
                  <span className="animate-ping absolute w-full h-full top-0 left-0 rounded-full bg-red-500" />
                </span>
                Gravando...{" "}
                <span className="absolute right-5 bottom-2 text-sm text-slate-500 ">
                  clique p/interromper
                </span>
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type="button"
                className="w-full fixed bottom-0 text-base py-4 bg-lime-400 
                        text-center text-slate-900 font-semibold outline-none hover:bg-lime-500 duration-200 group
                      "
              >
                Salvar nota.
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
