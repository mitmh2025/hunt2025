import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from "@mui/material";
import type { DialogProps } from "@toolpad/core/useDialogs";
import React, { useState } from "react";

export default function UnlockHintsDialog({
  onClose,
  open,
  payload,
}: DialogProps<string[], number | null>): JSX.Element {
  const [value, setValue] = useState<number | undefined>(3);

  return (
    <Dialog
      open={open}
      onClose={() => {
        void onClose(null);
      }}
    >
      <DialogTitle>Unlock Hints</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>Unlocking hints for {payload.join(", ")}</b>
        </DialogContentText>
        <DialogContentText sx={{ my: 2 }}>
          For how many hours must these puzzles have been unlocked before teams
          can request hints for them?
        </DialogContentText>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Input
            type="number"
            inputProps={{
              min: 0,
              max: 36,
            }}
            value={value}
            placeholder="?"
            onChange={(e) => {
              setValue(e.target.value ? parseFloat(e.target.value) : undefined);
            }}
          />
          <span>hours</span>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            void onClose(null);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={value === undefined}
          onClick={() => {
            void onClose(value ?? null);
          }}
        >
          Unlock
        </Button>
      </DialogActions>
    </Dialog>
  );
}
