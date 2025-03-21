import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import {
  fetchActivityLog,
  generateCompleteLogs,
  initializeLogs,
  resetNotificationHigHWaterMark,
} from "../../../lib/api/archive/log";
import { ALL_LOGS } from "../../../lib/api/archive/storage";
import { AuthorsNoteBlock } from "../components/PuzzleLayout";
import StyledDialog, { DialogActions } from "../components/StyledDialog";
import { Button, ButtonSecondary, ErrorText } from "../components/StyledUI";

const serializeState = async () => {
  const data = Object.fromEntries(
    ALL_LOGS.map((log) => [log.name, log.fetch()]),
  );

  const stream = new Blob([JSON.stringify(data)])
    .stream()
    .pipeThrough(new CompressionStream("gzip"));
  const buffer = await new Response(stream).arrayBuffer();

  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

const storeState = async (data: string) => {
  const compressed = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  const stream = new Blob([compressed])
    .stream()
    .pipeThrough(new DecompressionStream("gzip"));

  const buffer = await new Response(stream).arrayBuffer();
  const json = JSON.parse(new TextDecoder().decode(buffer)) as Record<
    string,
    unknown
  >;
  ALL_LOGS.forEach((log) => {
    const { name } = log;
    if (!(name in json)) {
      throw new Error(
        `Missing log ${name} in serialized state. Please check the serialization format.`,
      );
    }

    const data = json[name];
    if (!Array.isArray(data)) {
      throw new Error(
        `Invalid log ${name} in serialized state. Expected an array, got ${typeof data}.`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument -- We know the type of data here but our generics can't quite capture it
    log.set(data.map((e) => log.schema.parse(e)) as any);
  });

  resetNotificationHigHWaterMark(fetchActivityLog());
};

const ButtonBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ArchiveTeamManager = () => {
  const [confirming, setConfirming] = useState<
    "reset-start" | "reset-end" | "save" | undefined
  >(undefined);
  const [saveError, setSaveError] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (confirming) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [confirming]);

  const [modified, setModified] = useState(false);
  const [serialized, setSerialized] = useState<string | undefined>(undefined);
  const updateSerialized = useCallback(() => {
    void (async () => {
      setSerialized(await serializeState());
      setModified(false);
    })();
  }, []);
  useEffect(() => {
    updateSerialized();

    const cancellations = ALL_LOGS.map((log) =>
      log.subscribe(updateSerialized),
    );
    return () => {
      cancellations.forEach((cancel) => {
        cancel();
      });
    };
  }, [updateSerialized]);

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }

    return undefined;
  }, [copied]);
  const copyToClipboard = useCallback(() => {
    if (serialized) {
      void navigator.clipboard.writeText(serialized);
      setCopied(true);
    }
  }, [serialized]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSerialized(e.target.value);
    setModified(true);
  }, []);

  const resetStart = useCallback(() => {
    setConfirming("reset-start");
  }, []);
  const resetEnd = useCallback(() => {
    setConfirming("reset-end");
  }, []);
  const save = useCallback(() => {
    setConfirming("save");
  }, []);
  const dismiss = useCallback(() => {
    setConfirming(undefined);
    setSaveError(undefined);
  }, []);

  const confirm = useCallback(() => {
    switch (confirming) {
      case "reset-start":
        void initializeLogs().finally(() => {
          dismiss();
        });
        break;
      case "reset-end":
        void generateCompleteLogs().finally(() => {
          dismiss();
        });
        break;
      case "save":
        void storeState(serialized ?? "")
          .then(() => {
            dismiss();
          })
          .catch((e: unknown) => {
            setSaveError(e instanceof Error ? e.message : `${e}`);
          });
        break;
      default:
        // do nothing
        break;
    }
  }, [confirming, dismiss, serialized]);

  return (
    <>
      <StyledDialog ref={ref}>
        <h1>
          {confirming === "reset-start"
            ? "Reset to start of Hunt?"
            : confirming === "reset-end"
              ? "Reset to end of Hunt?"
              : confirming === "save"
                ? "Reset to new state?"
                : ""}
        </h1>

        <p>
          Are you sure you want to{" "}
          {confirming === "reset-start"
            ? "reset to the start of the Hunt"
            : confirming === "reset-end"
              ? "reset to the end of the Hunt"
              : confirming === "save"
                ? "reset to the state you’ve pasted in"
                : ""}
          ? This will overwrite your current state and there is no way to
          recover it.
        </p>

        {saveError && <ErrorText>Error saving state: {saveError}</ErrorText>}

        <DialogActions>
          <Button onClick={confirm}>Confirm</Button>
          <ButtonSecondary onClick={dismiss}>Cancel</ButtonSecondary>
        </DialogActions>
      </StyledDialog>
      <AuthorsNoteBlock>
        <p>
          Below you can see a compressed representation of your current progress
          through the Hunt. If you’re working with others, you can share this
          back and forth to stay in sync. You can also reset either to the
          beginning or the end of the Hunt.
        </p>

        <p>
          The representation used by this archival tool was not designed to be
          secure, and may include information that would be considered spoilers.
        </p>

        <textarea
          disabled={confirming !== undefined}
          style={{ width: "100%", height: "4rem" }}
          value={serialized ?? ""}
          onChange={onChange}
        />

        <ButtonBar>
          <Button disabled={confirming !== undefined} onClick={resetStart}>
            Reset to start of Hunt
          </Button>
          <Button disabled={confirming !== undefined} onClick={resetEnd}>
            Reset to end of Hunt
          </Button>
          <Button onClick={copyToClipboard}>
            {copied ? "Copied!" : "Copy to clipboard"}
          </Button>
          <Button
            disabled={confirming !== undefined || !modified}
            onClick={save}
          >
            Save
          </Button>
        </ButtonBar>
      </AuthorsNoteBlock>
    </>
  );
};

export default ArchiveTeamManager;
