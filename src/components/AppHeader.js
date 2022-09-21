import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
const AppHeader = () => {
	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography variant='h6' component='div' gutterBottom>
							{'Nimesa User App'}
						</Typography>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default AppHeader;
