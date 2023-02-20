import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { styled, keyframes } from "@stitches/react";
import {
  violet,
  mauve,
  blackA,
  grayDark,
  blueDark,
  red,
} from "@radix-ui/colors";
import {
  HamburgerMenuIcon,
  ChevronRightIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { TransparentButton } from "../TracingNode/styles";
import FileIcon from "../FileIcon";
import "./styles.css";
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

// const prompt =
//   vibe === "Funny"
//     ? `Generate 2 funny twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure there is a joke in there and it's a little ridiculous. Make sure each generated bio is at max 20 words and base it on this context: ${bio}${
//         bio.slice(-1) === "." ? "" : "."
//       }`
//     : `Generate 2 ${vibe} twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure each generated bio is at least 14 words and at max 20 words and base them on this context: ${bio}${
//         bio.slice(-1) === "." ? "" : "."
//       }`;

const DropdownMenuDemo: React.FC<{
  title: string;
  code: string;
}> = ({ title, code }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const [lintErrors, setLintErrors] = useState<{
    [key: string]: string[];
  } | null>(null);
  const [openAISuggestion, setOpenAISuggestion] = useState<string>("");
  const [openAIIsDone, setOpenAIIsDone] = useState<boolean>(false);

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

  const getLintedCode = async (code: string) => {
    try {
      setIsLoading(true);
      const response = await window.fetch("/api/eslint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, lang: "jsx" }),
      });
      const data = await response.json();
      setLintErrors(data.errors);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getOpenAISuggestion = async (prompt: string) => {
    try {
      setIsLoading(true);
      const payload: OpenAIStreamPayload = {
        model: "text-davinci-003",
        // prompt: "Say hello world to Next-Viz",
        prompt,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        stream: true,
        n: 1,
      };

      const stream = await OpenAIStream(payload);

      if (!stream) return;

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        if (!reader) return;
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value);
        setOpenAISuggestion((prev) => prev + chunk);
      }
      setOpenAIIsDone(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <IconButton aria-label="Customise options">
            <HamburgerMenuIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenuContent sideOffset={5}>
            <Dialog.Root>
              <DropdownMenuItemTrigger onClick={() => getHighlightedHtml(code)}>
                Show code
              </DropdownMenuItemTrigger>
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
            <DropdownMenuItem disabled>Show imports</DropdownMenuItem>
            <DropdownMenuItem disabled>Show JSX elements</DropdownMenuItem>
            <DropdownMenu.Sub>
              <DropdownMenuSubTrigger>
                Software Quality
                <RightSlot>
                  <ChevronRightIcon color="#fff" />
                </RightSlot>
              </DropdownMenuSubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                  <Dialog.Root>
                    <DropdownMenuItemTrigger
                      onClick={() => {
                        setIsError(false);
                        getLintedCode(code);
                      }}
                    >
                      Linting
                    </DropdownMenuItemTrigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="DialogOverlay" />
                      <Dialog.Content className="DialogContent">
                        <Dialog.Title className="DialogTitle">
                          {title}
                        </Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                          {isLoading && <div>Loading...</div>}
                          {!isLoading && isError && <div>Error</div>}
                          {!isLoading &&
                            !isError &&
                            lintErrors &&
                            Object.keys(lintErrors).map((key) => (
                              <div key={key}>
                                <ErrorTitle>{key}</ErrorTitle>
                                <ul>
                                  {lintErrors[key].map((error) => (
                                    <li key={error}>{error}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </Dialog.Description>
                        <Dialog.Close asChild>
                          <button className="IconButton" aria-label="Close">
                            <Cross2Icon />
                          </button>
                        </Dialog.Close>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                  <DropdownMenuSeparator />
                  <Dialog.Root>
                    <DropdownMenuItemTrigger
                      onClick={() => {
                        setIsError(false);
                        setOpenAIIsDone(false);
                        setOpenAISuggestion("");
                        getOpenAISuggestion(
                          `Genera una explicación amigables, de forma corta y concisa del código de ${title}:\n\n${code}`
                        );
                      }}
                    >
                      Explica el código ✨
                    </DropdownMenuItemTrigger>
                    <DropdownMenuItemTrigger
                      onClick={() => {
                        setIsError(false);
                        setOpenAIIsDone(false);
                        setOpenAISuggestion("");
                        getOpenAISuggestion(
                          `Genera 4 sugerencias de refactorización de forma amigable para el código de ${title}:\n\n${code}`
                        );
                      }}
                    >
                      Generar sugerencias ✨
                    </DropdownMenuItemTrigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="DialogOverlay" />
                      <Dialog.Content className="DialogContent">
                        <Dialog.Title className="DialogTitle">
                          {title}
                        </Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                          {isLoading && !openAISuggestion && !isError && (
                            <div>Loading...</div>
                          )}
                          {!isLoading && isError && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                gap: "1rem",
                                marginTop: "1rem",
                              }}
                            >
                              <OpenAISuggestion>
                                {openAISuggestion} ...
                              </OpenAISuggestion>
                              <Button
                                style={{ marginLeft: "1rem" }}
                                onClick={() => {
                                  setIsError(false);
                                  setOpenAIIsDone(false);
                                  setOpenAISuggestion("");
                                  getOpenAISuggestion(
                                    `Genera una explicación amigable, de forma corta y concisa del código de ${title}:\n\n${code}`
                                  );
                                }}
                              >
                                Regenerar sugerencia
                              </Button>
                            </div>
                          )}
                          {openAISuggestion && !isError && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                gap: "1rem",
                                marginTop: "1rem",
                              }}
                            >
                              <OpenAISuggestion>
                                {openAISuggestion}
                              </OpenAISuggestion>
                              {openAIIsDone && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontSize: "1.2rem",
                                    color: "#10B981",
                                  }}
                                >
                                  <span>Generación completada</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    width="20px"
                                    height="20px"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
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
                </DropdownMenuSubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
          </DropdownMenuContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const contentStyles = {
  minWidth: 280,
  backgroundColor: grayDark.gray3,
  borderRadius: 6,
  padding: 5,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
};
const DropdownMenuContent = styled(DropdownMenu.Content, contentStyles);
const DropdownMenuSubContent = styled(DropdownMenu.SubContent, contentStyles);

const itemStyles = {
  all: "unset",
  fontSize: 16,
  lineHeight: 1,
  color: blueDark.blue11,
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 30,
  padding: "0 5px",
  position: "relative",
  paddingLeft: 25,
  userSelect: "none",

  "&[data-disabled]": {
    color: mauve.mauve10,
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: blueDark.blue8,
    color: violet.violet1,
  },
};

const DropdownMenuItem = styled(DropdownMenu.Item, itemStyles);
const DropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger, {
  '&[data-state="open"]': {
    color: violet.violet1,
    backgroundColor: blueDark.blue8,
  },
  ...itemStyles,
});

const DropdownMenuSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: mauve.mauve11,
  margin: 5,
});

const RightSlot = styled("div", {
  marginLeft: "auto",
  paddingLeft: 20,
  color: mauve.mauve11,
  "[data-highlighted] > &": { color: "white" },
  "[data-disabled] &": { color: mauve.mauve10 },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 30,
  width: 30,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: blueDark.blue4,
  "&:hover": {
    backgroundColor: blueDark.blue8,
    cursor: "pointer",
  },
});

const DropdownMenuItemTrigger = styled(Dialog.Trigger, {
  ...itemStyles,
  width: "90%",
  "&:hover": {
    backgroundColor: blueDark.blue8,
    cursor: "pointer",
    color: violet.violet1,
  },
});

const ErrorTitle = styled("h3", {
  lineHeight: 1,
  color: red.red11,
});

const OpenAISuggestion = styled("div", {
  margin: "1rem 0",
  lineHeight: 1.8,
  fontSize: 16,
});

const Button = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: 3,
  minHeight: 30,
  minWidth: 100,
  padding: "10px 20px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: blueDark.blue4,
  "&:hover": {
    backgroundColor: blueDark.blue8,
    cursor: "pointer",
  },
});

export default DropdownMenuDemo;
