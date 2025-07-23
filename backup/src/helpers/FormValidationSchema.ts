import * as Yup from 'yup';

const FormValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .test('firstName', 'Please enter your first name.', (value) => {
      if (!value) return true;
      const valueWithoutMask = value.replace(/\D+/g, '');
      return valueWithoutMask.length <= 2;
    })
    .max(20, 'Must be 20 characters or fewer.')
    .required('Please enter your first name.'),
  emailAddress: Yup.string()
    .email('Please enter a valid email address.')
    .max(100, 'Must be 100 characters or fewer.')
    .required('Please enter a valid email address.'),
});

export default FormValidationSchema;
