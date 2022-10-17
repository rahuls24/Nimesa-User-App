import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { API, graphqlOperation } from 'aws-amplify';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { updateUser } from '../graphql/mutations';
import UserForm from './UserForm';
function EditUser(props) {
	const { setIsEditUserViewOpen } = props;
	const {
		name = '',
		email = '',
		phone = '',
		id = uuidv4(),
	} = props.usersData ?? {};

	const [isAccordionOpen, setIsAccordionOpen] = useState(true);

	const updateUserHandler = async userFormData => {
		const userPayload = {
			...userFormData,
			id,
		};
		try {
			await API.graphql(
				graphqlOperation(updateUser, {
					input: userPayload,
				}),
			);
			setIsEditUserViewOpen(false);
			return true;
		} catch (error) {
			console.log(error);
			setIsEditUserViewOpen(false);
			return false;
		}
	};
	const userFormProps = {
		submitBtnText: 'Update User',
		initialNameValue: name,
		initialEmailValue: email,
		initialPhoneValue: phone,
		onSubmitHandler: updateUserHandler,
		onErrorAlertText: 'Something went wrong.Please try again.',
		onSuccessALertText: 'User is updated successfully.',
	};
	return (
		<Accordion
			expanded={isAccordionOpen}
			onChange={() => setIsAccordionOpen(!isAccordionOpen)}
		>
			<AccordionSummary
				expandIcon={isAccordionOpen ? <ExpandLessIcon /> : <EditIcon />}
				aria-controls='add-user-content'
				id='add-user-header'
			>
				<Typography>Edit Users</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<UserForm {...userFormProps} />
			</AccordionDetails>
		</Accordion>
	);
}

export default EditUser;
