import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Button, Typography } from "@mui/material";
import {
  LinkListItem as ILinkListItem,
  LinkItem as ILinkItem,
} from "../../interfaces/links";
import LinkListItem from "../LinkListItem";
import { useLinksContext } from "../../store/LinksContext";

interface LinksListProps {
  userId: string;
}

const LinksList: React.FC<LinksListProps> = ({ userId }) => {
  const linksContext = useLinksContext();

  const [items, setItems] = useState<ILinkListItem[]>(
    linksContext.links.map((i) => ({
      ...i,
      editMode: false,
    }))
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over?.id);
      const sortedItems = arrayMove(items, oldIndex, newIndex);
      setItems(sortedItems);
      linksContext.reorderLinks(oldIndex, newIndex);
    }
  };

  const handleSave = (linkId: string, item: ILinkItem): void => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === linkId) {
          return { ...i, ...item, editMode: false };
        }
        return i;
      })
    );
    linksContext.upInsertLink(item);
  };

  const handleDelete = (linkId: string): void => {
    setItems((prev) => prev.filter((i) => i.id !== linkId));
    linksContext.removeLink(linkId, userId);
  };

  const handleEditMode = (linkId: string, editMode: boolean): void => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === linkId) {
          return { ...i, editMode };
        }
        return i;
      })
    );
  };

  const handlePrivateModeChange = (
    linkId: string,
    privateMode: boolean
  ): void => {
    let itemIndex = -1;
    const updateItems = items.map((i, index) => {
      if (i.id === linkId) {
        itemIndex = index;
        return { ...i, privateMode };
      }
      return i;
    });

    setItems(updateItems);
    linksContext.upInsertLink(updateItems[itemIndex]);
  };

  const createLinkItem = (): void => {
    setItems((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        url: "",
        title: "",
        userId,
        editMode: true,
        privateMode: false,
      },
    ]);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Drag and drop your links here to sort them
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {items.length ? (
            items.map((item) => (
              <LinkListItem
                key={item.id}
                item={item}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleEditMode={handleEditMode}
                handlePrivateMode={handlePrivateModeChange}
              />
            ))
          ) : (
            <Typography color="text.secondary" textAlign="center">
              No links added yet. Click the button below to add a link.
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={() => createLinkItem()}
            sx={{ width: "100%" }}
            disabled={items.some((i) => i.editMode)}
          >
            Add Link
          </Button>
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default LinksList;
