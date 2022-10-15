import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import UserDataTable from './components/UserDataTable';
import UserForm from './components/UserForm';
import useLocalStorage from './hooks/useLocalStorage';
import { delayForGivenTime } from './utils/commonFunctions';

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
function App({ isPassedToWithAuthenticator, signOut, user }) {
	const [userData, setUserData] = useLocalStorage('nimesa-users-list', []);
	const [userDataForTable, setUserDataForTable] = useState([]);
	const [isFetchingDataForUserData, setIsFetchingDataForUserData] =
		useState(false);

	// Simulating api call for fetching user by calling api
	const setUserDataForTableHandler = async userData => {
		setIsFetchingDataForUserData(true);
		await delayForGivenTime(3000);
		setUserDataForTable(userData);
		setIsFetchingDataForUserData(false);
	};

	useEffect(() => {
		setUserDataForTableHandler(userData);
	}, [userData]);

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
									<UserForm saveUser={setUserData} />
								</AccordionDetails>
							</Accordion>
						</Grid>

						<Grid item xs={4} md={5} lg={8}>
							<UserDataTable
								userData={userDataForTable}
								isFetching={isFetchingDataForUserData}
							/>
						</Grid>
					</Grid>
				</>
			)}
		</Authenticator>
	);
}

export default App;
