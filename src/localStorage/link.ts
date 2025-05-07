import { LinkItem } from "../interfaces/links";
import { getDashboardUserByUsernameLS } from "./users";

const getLinkByIdLS = (linkId: string, userId: string): LinkItem | null => {
  const links = localStorage.getItem("links");
  if (links) {
    const parsedLinks: LinkItem[] = JSON.parse(links);
    const link = parsedLinks.find(
      (link: LinkItem) => link.id === linkId && link.userId === userId
    );
    return link || null;
  }
  return null;
};

const deleteAllLinksByUserIdLS = (userId: string): LinkItem[] => {
  const links = localStorage.getItem("links");
  if (links) {
    const parsedLinks: LinkItem[] = JSON.parse(links);
    const updatedLinks = parsedLinks.filter(
      (link: LinkItem) => link.userId !== userId
    );
    localStorage.setItem("links", JSON.stringify(updatedLinks));
    return updatedLinks;
  }
  return [];
};

export const getAllLinksByUserIdLS = (userId: string): LinkItem[] => {
  const links = localStorage.getItem("links");
  if (links) {
    const parsedLinks: LinkItem[] = JSON.parse(links);
    return parsedLinks.filter((link: LinkItem) => link.userId === userId);
  }
  return [];
};

export const deleteLinkLS = (linkId: string, userId: string): LinkItem[] => {
  const links = localStorage.getItem("links");
  if (links) {
    const parsedLinks: LinkItem[] = JSON.parse(links);
    const updatedLinks = parsedLinks.filter(
      (link: LinkItem) => link.id !== linkId && link.userId === userId
    );
    localStorage.setItem("links", JSON.stringify(updatedLinks));
    return updatedLinks;
  }
  return [];
};

export const addLinkLS = (link: LinkItem): LinkItem[] => {
  const links = localStorage.getItem("links");
  if (links) {
    const parsedLinks: LinkItem[] = JSON.parse(links);
    parsedLinks.push(link);
    localStorage.setItem("links", JSON.stringify(parsedLinks));
    return getAllLinksByUserIdLS(link.userId);
  } else {
    localStorage.setItem("links", JSON.stringify([link]));
    return [link];
  }
};

export const upInsertLinkLS = (link: LinkItem): LinkItem[] => {
  const links = localStorage.getItem("links");
  if (links) {
    if (getLinkByIdLS(link.id, link.userId) === null) {
      return addLinkLS(link);
    }

    const parsedLinks: LinkItem[] = JSON.parse(links);
    const updatedLinks = parsedLinks.map((l: LinkItem) =>
      l.id === link.id ? { ...l, ...link } : l
    );
    localStorage.setItem("links", JSON.stringify(updatedLinks));
    return updatedLinks;
  }
  return addLinkLS(link);
};

export const getLinksByUsernameLS = (username: string): LinkItem[] => {
  const links = localStorage.getItem("links");
  if (links) {
    const parsedLinks: LinkItem[] = JSON.parse(links);

    const dashboardUser = getDashboardUserByUsernameLS(username);
    if (dashboardUser) {
      const userId = dashboardUser.userId;
      return parsedLinks.filter((link: LinkItem) => link.userId === userId);
    }
  }
  return [];
};

export const reorderLinksLS = (
  oldIndex: number,
  newIndex: number,
  userId: string
): LinkItem[] => {
  const links = localStorage.getItem("links");

  if (links) {
    const parsedLinks: LinkItem[] = JSON.parse(links);
    const userLinks = parsedLinks.filter(
      (link: LinkItem) => link.userId === userId
    );

    const reorderedLinks = [...userLinks];
    const [movedLink] = reorderedLinks.splice(oldIndex, 1);
    reorderedLinks.splice(newIndex, 0, movedLink);

    deleteAllLinksByUserIdLS(userId);

    reorderedLinks.forEach((link: LinkItem) => {
      addLinkLS(link);
    });

    return reorderedLinks;
  }
  return [];
};
