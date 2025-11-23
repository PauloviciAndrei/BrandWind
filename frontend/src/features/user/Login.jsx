import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import { useDispatch } from 'react-redux';
import API from '../../utils/API/api';
import { loginStart, loginSuccess, loginFailure } from './slices/authSlice';

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

function Login() {
  if (DEMO) {
    return <Navigate to="/app/welcome" replace />;
  }

  const INITIAL_LOGIN_OBJ = {
    password: '',
    email: '',
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await API.post('/auth/login', loginObj);
      const { token, user } = response.data;

      dispatch(loginSuccess({ token, user }));
      localStorage.setItem('token', token);

      window.location.href = '/app/welcome';
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setErrorMessage(message);
      dispatch(loginFailure(message));
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div>
            <LandingIntro />
          </div>

          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>

            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  type="email"
                  value={loginObj.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  type="password"
                  value={loginObj.password}
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm hover:text-primary hover:underline">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>

              <button
                type="submit"
                className={
                  'btn mt-2 w-full btn-primary' + (loading ? ' loading' : '')
                }
              >
                Login
              </button>

              <div className="text-center mt-4">
                Don't have an account?{' '}
                <Link to="/register">
                  <span className="hover:text-primary hover:underline">
                    Register
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

export default Login;
