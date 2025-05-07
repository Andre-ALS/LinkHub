import { Container } from "@mui/material";
import { useEffect } from "react";
import LinksList from "../../components/LinksList";
import { useAuthContext } from "../../store/AuthContext";
import { DashboardUser } from "../../interfaces/users";
import BioInfo from "../../components/BioInfo";

export default function Dashboard() {
  const authContext = useAuthContext();

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;

        authContext.updateDashboardUser({
          ...authContext.dashboardUser,
          profilePicture: base64Image,
        } as DashboardUser);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    authContext.updateDashboardUser({
      ...authContext.dashboardUser,
      name: newName,
    } as DashboardUser);
  };

  const handleChangeBio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBio = event.target.value;
    authContext.updateDashboardUser({
      ...authContext.dashboardUser,
      bio: newBio,
    } as DashboardUser);
  };

  useEffect(() => {
    const profilePicture = authContext.dashboardUser?.profilePicture;
    if (profilePicture) {
      authContext.updateDashboardUser({
        ...authContext.dashboardUser,
        profilePicture,
      } as DashboardUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <BioInfo
        profilePicture={authContext.dashboardUser?.profilePicture}
        name={authContext.dashboardUser?.name}
        bio={authContext.dashboardUser?.bio}
        handleImageUpload={handleImageUpload}
        handleChangeName={handleChangeName}
        handleChangeBio={handleChangeBio}
      />
      <LinksList userId={authContext.user!.id} />
    </Container>
  );
}
