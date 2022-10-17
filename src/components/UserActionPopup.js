import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
function SortByPopup(props) {
	const { open=true, setOpen, onCloseHandler } = props;
	const [value, setValue] = React.useState('editUser');

	const handleChange = event => {
		setValue(event.target.value);
	};
	const handleClose = () => {
		setOpen(false);
		onCloseHandler(value);
	};
	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Update User</DialogTitle>

				<DialogContent>
					{/* <DialogContentText> Choose the Sort By Selector</DialogContentText> */}
					<FormControl>
						<RadioGroup
							aria-labelledby='demo-controlled-radio-buttons-group'
							name='controlled-radio-buttons-group'
							value={value}
							onChange={handleChange}
						>
							<FormControlLabel
								value='editUser'
								control={<Radio  />}
								label={'Edit User'}
							/>
							<FormControlLabel
								value='deleteUser'
								control={<Radio />}
								label={'Delete user'}
							/>
						</RadioGroup>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						Cancel
					</Button>
					<Button onClick={handleClose}>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default SortByPopup;
