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
import { useState } from 'react';
const columns = [
	{ id: 'id', label: 'NO', minWidth: 60 },
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'email', label: 'Email', minWidth: 170 },
	{ id: 'phoneNumber', label: 'Phone Number', minWidth: 170 },
];

export default function UserDataTable({ userData, isFetching }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

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
							userData
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
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={userData.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
