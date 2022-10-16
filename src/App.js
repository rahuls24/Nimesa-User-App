import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './App.css';
import AppHeader from './components/AppHeader';
import UserDataTable from './components/UserDataTable';
import UserForm from './components/UserForm';

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
function App({ isPassedToWithAuthenticator, signOut, user }) {
	return (
		<Authenticator loginMechanisms={['email']}>
			{({ signOut, user }) => (
				<>
					<AppHeader signOutHandler={signOut} />
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, md: 8, lg: 12 }}
					>
						<Grid item xs={4} md={3} lg={4} sx={{ marginTop: 8 }}>
							{/* It can be a standalone component.  */}
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls='add-user-content'
									id='add-user-header'
								>
									<Typography>Add User</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<UserForm  />
								</AccordionDetails>
							</Accordion>
						</Grid>

						<Grid item xs={4} md={5} lg={8}>
							<UserDataTable
		
							/>
						</Grid>
					</Grid>
				</>
			)}
		</Authenticator>
	);
}

export default App;
