import { Authenticator } from '@aws-amplify/ui-react';
import Grid from '@mui/material/Grid';
import { Amplify } from 'aws-amplify';
import { useState } from 'react';
import './App.css';
import awsconfig from './aws-exports';
import AddUser from './components/AddUser';
import AppHeader from './components/AppHeader';
import EditUser from './components/EditUser';
import UserDataTable from './components/UserDataTable';
Amplify.configure(awsconfig);
function App() {
	const [isEditUserViewOpen, setIsEditUserViewOpen] = useState(false);
	const [currentUserData, setCurrentUserData] = useState({});
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
							{isEditUserViewOpen ? (
								<EditUser
									setIsEditUserViewOpen={
										setIsEditUserViewOpen
									}
									usersData={currentUserData}
								/>
							) : (
								<AddUser />
							)}
						</Grid>

						<Grid item xs={4} md={5} lg={8}>
							<UserDataTable
								setIsEditUserViewOpen={setIsEditUserViewOpen}
								setCurrentUserData={setCurrentUserData}
							/>
						</Grid>
					</Grid>
				</>
			)}
		</Authenticator>
	);
}

export default App;
