import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface BioInfoProps {
  profilePicture: string | undefined;
  name: string | undefined;
  bio: string | undefined;
  handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeBio?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
}

const BioInfo: React.FC<BioInfoProps> = ({
  profilePicture,
  name,
  bio,
  handleImageUpload,
  handleChangeName,
  handleChangeBio,
  disable = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        padding: 4,
      }}
    >
      <Button
        variant="contained"
        component="label"
        sx={{ borderRadius: "100%", padding: 0 }}
        disabled={disable}
      >
        <Avatar
          alt="Avatar"
          src={profilePicture}
          sx={{ width: 200, height: 200 }}
        >
          <PersonIcon sx={{ fontSize: 100 }} />
        </Avatar>
        <input
          type="file"
          hidden
          onChange={handleImageUpload}
          accept="profilePicture/*"
          disabled={disable}
        />
      </Button>
      {disable ? (
        <>
          <Typography variant="h4" fontWeight="bold">
            {name || "Missing name"}
          </Typography>
          <Typography variant="h6">{bio || "Missing bio"}</Typography>
        </>
      ) : (
        <>
          <TextField
            value={name}
            onChange={handleChangeName}
            label="Name"
            type="text"
            sx={{ width: "100%" }}
            size="small"
          />
          <TextField
            value={bio}
            onChange={handleChangeBio}
            label="Bio"
            type="text"
            multiline
            maxRows={4}
            sx={{ width: "100%" }}
            size="small"
          />
        </>
      )}
    </Box>
  );
};

export default BioInfo;
