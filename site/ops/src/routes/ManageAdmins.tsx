import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { useDialogs, useNotifications } from "@toolpad/core";
import {
  createMRTColumnHelper,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type OpsAdmins } from "../../../lib/api/admin_contract";
import { useOpsData } from "../OpsDataProvider";

function AddAdminDialog({
  open,
  onClose,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => Promise<void>;
}) {
  const notifications = useNotifications();
  const { adminClient } = useOpsData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name && email) {
      setSubmitting(true);
      adminClient
        .addOpsAdmin({
          body: {
            name,
            email,
          },
        })
        .then((result) => {
          if (result.status !== 200) {
            throw new Error(`HTTP ${result.status}: ${result.body}`);
          }

          return refetch();
        })
        .then(() => {
          notifications.show(`Admin added: ${email}`, {
            severity: "success",
            autoHideDuration: 3000,
          });

          setName("");
          setEmail("");

          onClose();
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Unknown error";
          notifications.show(`Failed to add admin: ${msg}`, {
            severity: "error",
            autoHideDuration: 3000,
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Admin</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            helperText="Must match the email they use to sign into the ops site,
              displayed top-right"
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={submitting}>
            Add {email}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function ManageAdmins() {
  const [admins, setAdmins] = useState<OpsAdmins | null>(null);
  const opsData = useOpsData();
  const notifications = useNotifications();
  const dialogs = useDialogs();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const fetchAdmins = useCallback(() => {
    return opsData.adminClient
      .getOpsAdmins()
      .then((resp) => {
        if (resp.status !== 200) {
          throw new Error(`HTTP ${resp.status}: ${resp.body}`);
        }

        setAdmins(resp.body);
      })
      .catch((err: unknown) => {
        console.error(err);

        const msg = err instanceof Error ? err.message : "Unknown error";
        setAdmins(null);
        notifications.show(`Failed to fetch admins: ${msg}`, {
          severity: "error",
          autoHideDuration: 3000,
        });
      });
  }, [notifications, opsData.adminClient]);

  useEffect(() => {
    void fetchAdmins();
  }, [fetchAdmins]);

  const columns = useMemo(() => {
    const columnHelper = createMRTColumnHelper<OpsAdmins[number]>();

    return [
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.accessor("added_by", {
        header: "Added By",
      }),
    ];
  }, []);

  function handleDelete(email: string) {
    dialogs
      .confirm(`Are you sure you want to delete ${email}?`, {
        title: "Remove Admin",
        okText: "Remove",
        cancelText: "Cancel",
        severity: "error",
        onClose: async (confirmed) => {
          if (!confirmed) {
            return;
          }

          try {
            const res = await opsData.adminClient.removeOpsAdmin({
              params: { email },
            });
            if (res.status !== 200) {
              throw new Error(`HTTP ${res.status}: ${res.body}`);
            }

            await fetchAdmins();
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            notifications.show(`Failed to delete admin: ${msg}`, {
              severity: "error",
              autoHideDuration: 3000,
            });
          }

          return;
        },
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }

  const table = useMaterialReactTable({
    columns,
    data: admins ?? [],
    initialState: {
      density: "compact",
      sorting: [
        {
          id: "name",
          desc: false,
        },
      ],
    },
    enableDensityToggle: false,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton
          onClick={() => {
            handleDelete(row.original.email);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setAddDialogOpen(true);
          }}
        >
          Add Admin
        </Button>
      </Box>
    ),
  });

  if (admins === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MaterialReactTable table={table} />
      <AddAdminDialog
        open={addDialogOpen}
        onClose={() => {
          setAddDialogOpen(false);
        }}
        refetch={fetchAdmins}
      />
    </>
  );
}
