import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { API, graphqlOperation } from 'aws-amplify';
import { useFormik } from 'formik';
import { forwardRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { createUser } from '../graphql/mutations';
const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

// The phone number validating regular expression
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
	name: yup
		.string()
		.trim()
		.min(1, 'Name should be of minimum 1 character length')
		.required('Name is required'),
	email: yup
		.string()
		.email('Enter a valid email')
		.required('Email is required'),
	phone: yup
		.string()
		.matches(phoneRegExp, 'Phone number is not valid')
		.required('Phone Number is required'),
});
export default function UserForm({ saveUser }) {
	const [autoHideAlertProps, setAutoHideAlertProps] = useState({
		shouldShow: false,
		alertMsg: '',
		severity: 'success',
	});

	const [isSaveBtnLoading, setIsSaveBtnLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			phone: '',
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			setIsSaveBtnLoading(true);
			const userPayload = {
				...values,
				id: uuidv4(),
			};
			try {
				await API.graphql(
					graphqlOperation(createUser, {
						input: userPayload,
					}),
				);
				setAutoHideAlertProps(prev => ({
					...prev,
					shouldShow: true,
					alertMsg: 'User is added successfully',
				}));
			} catch (error) {
				setAutoHideAlertProps(prev => ({
					...prev,
					shouldShow: true,
					severity: 'error',
					alertMsg: 'Something went wrong. Please try again.',
				}));
				console.log(error);
			}
			resetForm();
			setIsSaveBtnLoading(false);
		},
	});

	const resetForm = () => formik.resetForm();

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box
					component='form'
					onSubmit={formik.handleSubmit}
					sx={{ mt: 1 }}
				>
					<TextField
						margin='normal'
						autoFocus
						fullWidth
						id='name'
						label='Name'
						name='name'
						autoComplete='name'
						value={formik.values.name}
						onChange={formik.handleChange}
						error={
							formik.touched.name && Boolean(formik.errors.name)
						}
						helperText={formik.touched.name && formik.errors.name}
					/>
					<TextField
						margin='normal'
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						error={
							formik.touched.email && Boolean(formik.errors.email)
						}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						margin='normal'
						fullWidth
						id='phone'
						label='Phone Number'
						name='phone'
						autoComplete='phone'
						value={formik.values.phone}
						onChange={formik.handleChange}
						error={
							formik.touched.phone && Boolean(formik.errors.phone)
						}
						helperText={formik.touched.phone && formik.errors.phone}
					/>

					<LoadingButton
						loading={isSaveBtnLoading}
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Save User
					</LoadingButton>
				</Box>
			</Box>
			<Snackbar
				open={autoHideAlertProps.shouldShow}
				autoHideDuration={4000}
				onClose={() =>
					setAutoHideAlertProps(prev => ({
						...prev,
						shouldShow: false,
					}))
				}
			>
				<Alert
					severity={autoHideAlertProps.severity}
					sx={{ width: '100%' }}
					onClose={() =>
						setAutoHideAlertProps(prev => ({
							...prev,
							shouldShow: false,
						}))
					}
				>
					{autoHideAlertProps.alertMsg}
				</Alert>
			</Snackbar>
		</Container>
	);
}
