import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../shared/components/Button';
import { useRegisterUser } from '../hooks/useRegisterUser';
import { useLoginUser } from '../hooks/useLoginUser';
import { usePersistContext } from '../../../store/usePersistContext';

interface ManagerRegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Please enter your name')
    .min(3, 'Your name should be at least 3 characters')
    .max(20, 'Your name should be at most 20 characters')
    .matches(/^[\w]+$/, 'Name should contain only characters in the range a-z, A-Z, 0-9 and underscore.'),
  email: Yup.string()
    .trim()
    .required('Please enter your email address')
    .email('Please enter a valid email address')
    .matches(/^[\w\-.]+@stud.noroff\.no$/, 'Email must end with @stud.noroff.no'),
  password: Yup.string().trim().required('Please enter your password').min(8, 'Password must be at least 8 characters'),
});

function ManagerRegisterForm() {
  const { setProfileData, setAccessToken } = usePersistContext();
  const { loading: loadingRegister, error: errorRegister, registerUser } = useRegisterUser();
  const { loading: loadingLogin, error: errorLogin, loginUser } = useLoginUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const loading = loadingRegister || loadingLogin;
  const error = errorRegister || errorLogin;

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ManagerRegisterFormInputs> = async (data, e) => {
    e?.preventDefault();

    const { success, data: userData } = await registerUser(data.name, data.email, data.password, true);

    if (success && userData) {
      const { success, data: userData, accessToken } = await loginUser(data.email, data.password);

      if (success && userData && accessToken) {
        setProfileData(userData);
        setAccessToken(accessToken);
        navigate('/profile');
      }
    }
  };

  return (
    <div className="md:flex md:flex-row">
      <div className="flex-1 bg-blue-primary-dark flex flex-col justify-between p-4">
        <div className="space-y-6 md:space-y-8 lg:space-y-16 mb- md:mb-10">
          <div>
            <p className="text-accent-pink font-light text-transform : uppercase text-body-small md:text-heading-6">
              Become manager
            </p>
            <h1 className="text-typography-primary-white font-bold text-heading-6 md:text-heading-3">
              Easily list, update and monitor
            </h1>
            <p className="text-accent-pink font-light text-body-small md:text-heading-5">your properties</p>
          </div>

          <div className="space-y-2 md:space-y-4 break-words text-typography-primary-white text-body-small md:text-body-medium">
            <p>Creating a manager account allows you to create, update, delete and manage your venues with ease.</p>
            <p>
              As a manager, you'll have access to tools designed for venue management, including booking overviews and
              venue performance insights.
            </p>
            <p>This role is ideal for property owners or those managing multiple accommodation listings.</p>
          </div>
        </div>

        <div className="flex justify-center gap-8 pt-6 sm:pt-10 text-typography-primary-white text-body-small text-nowrap">
          <Link to={'/'}>
            <p>Back to Home</p>
          </Link>
          <div className="border-l border-typography-primary-white h-6"></div>
          <button className="place-self-start" onClick={() => navigate(-1)}>
            Skip for Now
          </button>
        </div>
      </div>

      <form
        className="flex-1 space-y-8 flex flex-col place-items-center p-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="text-center mt-4">
          <h1 className="text-primary-dark-blue font-bold text-heading-5 sm:text-heading-4 md:text-heading-3">
            Create an Account
          </h1>
          <p className="text-typography-primary-blue text-body-small sm:text-base md:text-lg">
            Please fill these details to create an account
          </p>
        </div>

        <div className="place-self-start w-full space-y-4 md:space-y-6 lg:space-y-8 text-body-small sm:text-body-medium">
          <div>
            <label htmlFor="name" id="name" className="block text-typography-primary-blue">
              Name
            </label>
            <input
              id="name"
              type="name"
              {...register('name')}
              placeholder="Enter your name"
              aria-labelledby="name"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            />
            {errors.name && <div className="text-status-error-red">{errors.name.message}</div>}
          </div>

          <div>
            <label htmlFor="email" id="email" className="block text-typography-primary-blue">
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register('email')}
              placeholder="Enter your email"
              aria-labelledby="email"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            />
            {errors.email && <div className="text-status-error-red">{errors.email.message}</div>}
          </div>

          <div>
            <label htmlFor="password" id="password" className="block text-typography-primary-blue">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              {...register('password')}
              placeholder="Enter your password"
              aria-labelledby="password"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            />
            {errors.password && <div className="text-status-error-red">{errors.password.message}</div>}
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-status-error-red">{error}</p>}

        <Button type="submit" label="Register" ariaLabel="Register" variant="default" className="w-4/5" />

        <div className="flex w-full space-x-6 place-content-center text-body-medium">
          <p className="text-primary-dark-blue">Already have an account?</p>
          <Link to={'/auth/login'}>
            <p className="text-primary-dark-blue font-semibold">Login</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ManagerRegisterForm;
