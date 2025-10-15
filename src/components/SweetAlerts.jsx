import Swal from 'sweetalert2';

// Confirm genérico (úsalo para publicar, borrar, etc.)
export async function confirmAction({
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  icon = 'warning',
} = {}) {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  });
}

// Mensajes de feedback
export function showSuccess({ title = 'Done!', text = 'Operation successful.' } = {}) {
  return Swal.fire({ title, text, icon: 'success' });
}

export function showError({ title = 'Error', text = 'Something went wrong.' } = {}) {
  return Swal.fire({ title, text, icon: 'error' });
}

export function showWarning({ title = 'Incomplete', text = 'Please fill all fields.' } = {}) {
  return Swal.fire({ title, text, icon: 'warning' });
}