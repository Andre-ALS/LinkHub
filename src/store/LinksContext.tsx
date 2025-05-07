import { createContext, useContext, useEffect, useState } from "react";
import { LinkItem } from "../interfaces/links";
import {
  addLinkLS,
  deleteLinkLS,
  getAllLinksByUserIdLS,
  getLinksByUsernameLS,
  reorderLinksLS,
  upInsertLinkLS,
} from "../localStorage/link";
import { useAuthContext } from "./AuthContext";

interface LinksContextType {
  links: LinkItem[];
  addLink: (link: LinkItem) => void;
  removeLink: (linkId: string, userId: string) => void;
  upInsertLink: (link: LinkItem) => void;
  getLinksByUsername: (username: string) => LinkItem[];
  reorderLinks: (oldIndex: number, newIndex: number) => void;
  isLoading: boolean;
}

const initialState: LinksContextType = {
  links: [],
  addLink: () => {},
  removeLink: () => {},
  upInsertLink: () => {},
  getLinksByUsername: () => [],
  reorderLinks: () => {},
  isLoading: false,
};

const LinksContext = createContext<LinksContextType>(initialState);

export const LinksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authContext = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [links, setLinks] = useState<LinkItem[]>([]);

  const addLink = (link: LinkItem) => {
    const addedLinks = addLinkLS(link);
    setLinks(addedLinks);
  };

  const removeLink = (linkId: string, userId: string) => {
    const updatedLinks = deleteLinkLS(linkId, userId);
    setLinks(updatedLinks);
  };

  const upInsertLink = (link: LinkItem) => {
    const updatedLinks = upInsertLinkLS(link);
    setLinks(updatedLinks);
  };

  const getLinksByUsername = (username: string): LinkItem[] => {
    setIsLoading(true);
    const userLinks = getLinksByUsernameLS(username);
    return userLinks;
    setIsLoading(false);
  };

  const reorderLinks = (oldIndex: number, newIndex: number) => {
    const reorderedLinks = reorderLinksLS(
      oldIndex,
      newIndex,
      authContext.user?.id || ""
    );
    setLinks(reorderedLinks);
  };

  useEffect(() => {
    setIsLoading(true);
    const userId = authContext.user?.id;

    if (userId) {
      const userLinks = getAllLinksByUserIdLS(userId);
      setLinks(userLinks);
    }

    setIsLoading(false);
    return () => {
      setLinks([]);
    };
  }, [authContext.user]);

  return (
    <LinksContext.Provider
      value={{
        links,
        addLink,
        removeLink,
        upInsertLink,
        getLinksByUsername,
        reorderLinks,
        isLoading,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLinksContext = (): LinksContextType => useContext(LinksContext);
