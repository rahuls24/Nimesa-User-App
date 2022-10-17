import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { API, graphqlOperation } from 'aws-amplify';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createUser } from '../graphql/mutations';
import UserForm from './UserForm';
function AddUser() {
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const saveUserHandler = async userFormData => {
		const userPayload = {
			...userFormData,
			id: uuidv4(),
		};
		try {
			await API.graphql(
				graphqlOperation(createUser, {
					input: userPayload,
				}),
			);
			return true;
		} catch (error) {
			return false;
		}
	};
	const userFormProps = {
		submitBtnText: 'Save User',
		onSubmitHandler: saveUserHandler,
		onErrorAlertText: 'Something went wrong.Please try again',
		onSuccessALertText: 'User is added successfully.',
	};
	return (
		<Accordion
			expanded={isAccordionOpen}
			onChange={() => setIsAccordionOpen(!isAccordionOpen)}
		>
			<AccordionSummary
				expandIcon={isAccordionOpen ? <ExpandLessIcon /> : <AddIcon />}
				aria-controls='add-user-content'
				id='add-user-header'
			>
				<Typography>Add User</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<UserForm {...userFormProps} />
			</AccordionDetails>
		</Accordion>
	);
}

export default AddUser;
