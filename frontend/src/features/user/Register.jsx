import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import { useDispatch } from 'react-redux';
import API from '../../utils/API/api';
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from './slices/authSlice';

function Register() {
  const INITIAL_REGISTER_OBJ = {
    name: '',
    password: '',
    email: '',
  };

  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    dispatch(registerStart());

    try {
      const response = await API.post('/auth/register', registerObj);
      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Update Redux
      dispatch(registerSuccess({ token, user }));

      // Redirect to dashboard
      window.location.href = '/app/welcome';
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setErrorMessage(message);
      dispatch(registerFailure(message));
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div>
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Register
            </h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  value={registerObj.name}
                  updateType="name"
                  containerStyle="mt-4"
                  labelTitle="Name"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  value={registerObj.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  value={registerObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  'btn mt-2 w-full btn-primary' +
                  (registerObj.loading ? ' loading' : '')
                }
              >
                Register
              </button>
              <div className="text-center mt-4">
                Already have an account?{' '}
                <Link to="/login">
                  <span className="hover:text-primary hover:underline cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
