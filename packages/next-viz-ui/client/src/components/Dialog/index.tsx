import * as Dialog from "@radix-ui/react-dialog";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";
import FileIcon from "../FileIcon";
import { TransparentButton } from "../TracingNode/styles";
import "./styles.css";
import { useState } from "react";

const DialogDemo: React.FC<{
  title: string;
  code: string;
}> = ({ title, code }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

  const getHighlightedHtml = async (code: string) => {
    try {
      setIsLoading(true);
      const response = await window.fetch("/api/shiki", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, lang: "jsx" }),
      });
      const data = await response.text();
      console.log({ data });
      setHighlightedHtml(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open>
      <Dialog.Trigger onClick={() => getHighlightedHtml(code)} asChild>
        <TransparentButton className="dots">
          <FileIcon />
        </TransparentButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {isLoading && <div>Loading...</div>}
            {!isLoading && isError && <div>Error</div>}
            {!isLoading && !isError && highlightedHtml && (
              <div
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                className="shiki"
              />
            )}
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
