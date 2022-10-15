import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppHeader = ({ signOutHandler }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					>
						User App
					</Typography>
					<Button onClick={signOutHandler} color='inherit'>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
export default AppHeader;
