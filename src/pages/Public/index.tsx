import { useParams } from "react-router-dom";
import BioInfo from "../../components/BioInfo";
import { useLinksContext } from "../../store/LinksContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../store/AuthContext";
import { DashboardUser } from "../../interfaces/users";
import { LinkItem } from "../../interfaces/links";
import { Box, Container, Typography } from "@mui/material";
import LinkListItem from "../../components/LinkListItem";

export default function Public() {
  const { username } = useParams();

  const authContext = useAuthContext();
  const linksContext = useLinksContext();

  const [dashboardUser, setDashboardUser] = useState<DashboardUser | null>(
    null
  );
  const [userLinks, setUserLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    if (username) {
      const dashboardUserData =
        authContext.getDashboardUserByUsername(username);
      const userLinksData = linksContext.getLinksByUsername(username);
      setDashboardUser(dashboardUserData);
      setUserLinks(userLinksData.filter((link) => !link.privateMode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const isLoading = linksContext.isLoading || authContext.isLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{
        height: "fit-content",
        display: "flex",
        alignItems: "center",
        padding: 4,
        flexDirection: "column",
        width: 600,
      }}
    >
      {dashboardUser ? (
        <>
          <BioInfo
            profilePicture={dashboardUser?.profilePicture}
            name={dashboardUser?.name}
            bio={dashboardUser?.bio}
            disable
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              // alignItems: "center",
            }}
          >
            {userLinks.length ? (
              userLinks.map((link) => (
                <LinkListItem
                  key={link.id}
                  item={{ ...link, editMode: false }}
                  redirect
                />
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 4,
                }}
              >
                <Typography variant="h5">This user has no links</Typography>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <Typography variant="h4">User not found</Typography>
      )}
    </Container>
  );
}
