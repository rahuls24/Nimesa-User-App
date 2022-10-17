import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { deleteUser } from '../graphql/mutations';
import { listUsers } from '../graphql/queries';
import {
	onCreateUser,
	onDeleteUser,
	onUpdateUser
} from '../graphql/subscriptions';
import UserActionPopup from './UserActionPopup';
const columns = [
	{ id: 'id', label: 'NO', minWidth: 60 },
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'email', label: 'Email', minWidth: 170 },
	{ id: 'phone', label: 'Phone Number', minWidth: 170 },
];

export default function UserDataTable(props) {
	const { setIsEditUserViewOpen, setCurrentUserData } = props;
	const [usersData, setUsersData] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [isUpdateUserPopupOpen, setIsUpdateUserPopupOpen] = useState(false);
	const [currentSelectUser, setCurrentSelectUser] = useState(null);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const getUsersData = async () => {
		setIsFetching(true);
		try {
			const usersData = await API.graphql(graphqlOperation(listUsers));
			if ('listUsers' in usersData.data) {
				const usersArray = usersData.data.listUsers?.items ?? [];
				setUsersData([...usersArray]);
			}
		} catch (error) {
			console.log(error);
		}
		setIsFetching(false);
	};
	const updateUser = async action => {
		switch (action) {
			case 'editUser':
				setIsEditUserViewOpen(true);
				setCurrentUserData(currentSelectUser);
				break;
			case 'deleteUser':
				try {
					await API.graphql({
						query: deleteUser,
						variables: { input: { id: currentSelectUser.id } },
					});
				} catch (error) {
					console.log(error);
				}

				break;
			default:
				break;
		}
	};
	useEffect(() => {
		getUsersData();
	}, []);

	useEffect(() => {
		const userAddedSubscription = API.graphql(
			graphqlOperation(onCreateUser),
		).subscribe({
			next: getUsersData,
			error: error => console.warn(error),
		});
		const userDeletedSubscription = API.graphql(
			graphqlOperation(onDeleteUser),
		).subscribe({
			next: getUsersData,
			error: error => console.warn(error),
		});
		const userUpdatedSubscription = API.graphql(
			graphqlOperation(onUpdateUser),
		).subscribe({
			next: getUsersData,
			error: error => console.warn(error),
		});

		return () => {
			userAddedSubscription.unsubscribe();
			userDeletedSubscription.unsubscribe();
			userUpdatedSubscription.unsubscribe();
		};
	}, []);
	return (
		<Paper
			sx={{
				width: '100%',
				overflow: 'hidden',
				marginTop: '64px !important',
			}}
		>
			<Typography
				component='h1'
				variant='h5'
				width={'100%'}
				textAlign='center'
				marginY={1}
			>
				Users Data
			</Typography>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{!isFetching &&
							usersData
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage,
								)
								.map((user, userNo) => {
									return (
										<TableRow
											hover
											role='checkbox'
											tabIndex={-1}
											key={user.id}
											sx={{ cursor: 'pointer' }}
											onClick={() => {
												setCurrentSelectUser(user);
												setIsUpdateUserPopupOpen(true);
											}}
										>
											{columns.map(column => {
												const value =
													column.id === 'id'
														? page * rowsPerPage +
														  userNo +
														  1
														: user[column.id];
												return (
													<TableCell key={column.id}>
														{value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
					</TableBody>
				</Table>
			</TableContainer>

			{isFetching && (
				<Box
					sx={{
						width: '100%',
						minHeight: '250px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<CircularProgress />
				</Box>
			)}
			{!isFetching && usersData?.length === 0 && (
				<Box
					sx={{
						width: '100%',
						minHeight: '250px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography component='h1' variant='h6'>
						{'No user found.'}
					</Typography>
				</Box>
			)}
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={usersData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			<UserActionPopup
				open={isUpdateUserPopupOpen}
				setOpen={setIsUpdateUserPopupOpen}
				onCloseHandler={updateUser}
			/>
		</Paper>
	);
}
