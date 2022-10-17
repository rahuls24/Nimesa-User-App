import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { forwardRef, useState } from 'react';
import * as yup from 'yup';
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
export default function UserForm(props) {
	const {
		submitBtnText = 'Save User',
		onSubmitHandler,
		initialNameValue = '',
		initialEmailValue = '',
		initialPhoneValue = '',
		onErrorAlertText = 'Something went wrong.',
		onSuccessALertText = 'Action is done successfully.',
	} = props;
	const [autoHideAlertProps, setAutoHideAlertProps] = useState({
		shouldShow: false,
		alertMsg: '',
		severity: 'success',
	});

	const [isSaveBtnLoading, setIsSaveBtnLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: initialNameValue,
			email: initialEmailValue,
			phone: initialPhoneValue,
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			setIsSaveBtnLoading(true);
			const isOnSubmitSuccess = await onSubmitHandler(values);
			if (isOnSubmitSuccess)
				setAutoHideAlertProps(prev => ({
					...prev,
					shouldShow: true,
					alertMsg: onSuccessALertText,
				}));
			else
				setAutoHideAlertProps(prev => ({
					...prev,
					shouldShow: true,
					severity: 'error',
					alertMsg: onErrorAlertText,
				}));

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
						{submitBtnText}
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
