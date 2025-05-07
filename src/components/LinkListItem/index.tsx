import {
  Box,
  Button,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  LinkListItem as ILinkListItem,
  LinkItem as ILinkItem,
} from "../../interfaces/links";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface LinkListItemProps {
  item: ILinkListItem;
  handleSave?: (linkId: string, item: ILinkItem) => void;
  handleDelete?: (linkId: string) => void;
  handleEditMode?: (linkId: string, editMode: boolean) => void;
  handlePrivateMode?: (linkId: string, privateMode: boolean) => void;
  redirect?: boolean;
}

const LinkListItem: React.FC<LinkListItemProps> = ({
  item,
  handleSave,
  handleDelete,
  handleEditMode,
  handlePrivateMode,
  redirect = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const [linkItem, setLinkItem] = useState<ILinkItem>({ ...item });

  const updateField = (
    field: keyof ILinkListItem,
    value: string | boolean
  ): void => {
    setLinkItem((prev) => ({ ...prev, [field]: value }));
  };

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        ...{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          overflow: "hidden",
          borderRadius: 2,
          border: "1px solid black",
          backgroundColor: "background.paper",
          zIndex: 9,
          gap: 2,
        },
        ...(redirect && {
          backgroundColor: "background.default",
          color: "secondary.main",
          border: "none",
          "&:hover": {
            opacity: 0.8,
            cursor: "pointer",
          },
        }),
      }}
      onClick={() => {
        if (redirect && !item.editMode) {
          window.open(item.url, "_blank", "noopener,noreferrer");
        }
      }}
    >
      {item.editMode ? (
        <Box
          component="form"
          onSubmit={(e) => {
            if (handleSave) {
              handleSave(item.id, linkItem);
            }
            e.preventDefault();
          }}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            required
            value={linkItem.title}
            onChange={(e) => updateField("title", e.target.value)}
            label="Title"
            type="text"
            size="small"
          />
          <TextField
            required
            value={linkItem.url}
            onChange={(e) => updateField("url", e.target.value)}
            label="URL"
            type="url"
            size="small"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: 2,
            }}
          >
            {handleDelete && !redirect && (
              <IconButton onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            )}
            {handleSave && !redirect && (
              <Button variant="contained" type="submit">
                Save
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
          }}
        >
          <Typography
            variant="h6"
            sx={{ textTransform: "none", alignSelf: "center", flexGrow: 1 }}
          >
            {item.title || "No title"}
          </Typography>
          {handlePrivateMode && !redirect && (
            <Switch
              checked={item.privateMode}
              onChange={(e) => handlePrivateMode(item.id, e.target.checked)}
            />
          )}
          {handleEditMode && !redirect && (
            <IconButton onClick={() => handleEditMode(item.id, true)}>
              <EditIcon />
            </IconButton>
          )}
          {handleDelete && !redirect && (
            <IconButton onClick={() => handleDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      )}
      {!redirect ? (
        <Box>
          <IconButton {...attributes} {...listeners}>
            <DragIndicatorIcon />
          </IconButton>
        </Box>
      ) : (
        <KeyboardArrowRightIcon />
      )}
    </Box>
  );
};

export default LinkListItem;
