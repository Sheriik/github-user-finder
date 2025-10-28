import { Box, Typography, Stack, Divider, Link, Chip } from "@mui/material"
import LinkIcon from "@mui/icons-material/Link"
import {useAppSelector} from "../hooks";

export default function AboutSection() {
    const { userData } = useAppSelector(s => s.user)
    if (!userData) {
        return <Typography>Search for a user to view their profile</Typography>
    }

    return (
        <Stack spacing={3}>
            {/* Bio Section */}
            {userData.bio && (
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        Bio
                    </Typography>
                    <Typography variant="body2">{userData.bio}</Typography>
                </Box>
            )}

            <Divider />

            {/* Stats Section */}
            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                    Profile Stats
                </Typography>
                <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            Public Repositories
                        </Typography>
                        <Chip label={userData.public_repos ?? 0} variant="outlined" />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            Followers
                        </Typography>
                        <Chip label={userData.followers ?? 0} variant="outlined" />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            Following
                        </Typography>
                        <Chip label={userData.following ?? 0} variant="outlined" />
                    </Box>
                </Stack>
            </Box>

            <Divider />

            {/* Profile Link */}
            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Links
                </Typography>
                <Link
                    href={userData.html_url}
                    target="_blank"
                    rel="noreferrer"
                    sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none" }}
                >
                    <LinkIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2">View on GitHub</Typography>
                </Link>
            </Box>
        </Stack>
    )
}
