import Swal from 'sweetalert2';

const customErrorMessage = ({ response }) => {
  let alertDescription = 'Something went wrong! Please try again.';
  if (response && response.data && response.data.error && response.data.error.code === 'CustomError') {
    alertDescription = response.data.error.message;
  }

  Swal.fire({
    title: 'Oops!',
    text: alertDescription,
  });
};

export default customErrorMessage;