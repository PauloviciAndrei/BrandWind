import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../../utils/API/api';
import ErrorText from '../../components/Typography/ErrorText';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!newPassword) return setErrorMessage('Password is required');

    setLoading(true);
    try {
      await API.post('/auth/reset-password', { token, newPassword });
      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || 'Failed to reset password'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 card w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Password Reset Successful!
          </h2>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h2>
        <form onSubmit={submitForm}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <ErrorText>{errorMessage}</ErrorText>
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
