import { useCallback, useState } from "react";
import { styled } from "styled-components";
import {
  generateCompleteLogs,
  initializeLogs,
} from "../../../../lib/api/archive/log";
import { AuthorsNoteBlock } from "../../components/PuzzleLayout";
import { Button } from "../../components/StyledUI";
import rootUrl from "../../utils/rootUrl";
import { ModalBackdrop, ModalContent } from "./modals";

const InitializeButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;

  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const InitializeActivityLogModal = ({ unmount }: { unmount: () => void }) => {
  const [disable, setDisable] = useState(false);

  const handleReset = useCallback(() => {
    void (async () => {
      setDisable(true);
      try {
        await initializeLogs();
        unmount();
      } finally {
        setDisable(false);
      }
    })();
  }, [unmount]);

  const handleEnd = useCallback(() => {
    void (async () => {
      setDisable(true);
      try {
        await generateCompleteLogs();
        unmount();
      } finally {
        setDisable(false);
      }
    })();
  }, [unmount]);

  return (
    <ModalBackdrop>
      <ModalContent>
        <AuthorsNoteBlock>
          <p>
            Welcome to the 2025 MIT Mystery Hunt: The Case of the Shadow
            Diamond!
          </p>

          <p>
            Right now, the Hunt hasn’t started yet. If you’d like, you can start
            at the beginning of the Hunt — this archival site supports as much
            of the original unlock structure as we were able to manage.
            Alternatively, you can unlock all rounds and puzzles for a more
            traditional Hunt archive format.
          </p>

          <p>
            If you choose to unlock everything, we will also include a handful
            of reserve puzzles that were written and tested but never released.
            You can find them with the other{" "}
            <a href={`${rootUrl}/rounds/stray_leads`}>Stray Leads</a>.
          </p>

          <p>
            If you change your mind or want to share your current state with
            someone else, you can do so on the{" "}
            <a href={`${rootUrl}/team`}>Manage Team page</a>.
          </p>

          <InitializeButtonWrapper>
            <Button onClick={handleReset} disabled={disable}>
              Start the Hunt from beginning
            </Button>
            <Button onClick={handleEnd} disabled={disable}>
              Unlock everything
            </Button>
          </InitializeButtonWrapper>
        </AuthorsNoteBlock>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default InitializeActivityLogModal;
