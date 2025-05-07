export interface LinkItem {
  id: string;
  url: string;
  title: string;
  userId: string;
  privateMode: boolean;
}

export interface LinkListItem extends LinkItem {
  editMode: boolean;
}
