import { Helmet } from 'react-helmet-async';
import { FaEdit, FaUserCog } from 'react-icons/fa';
import { BsEnvelopeAt } from 'react-icons/bs';
import {
  MdBrowserUpdated,
  MdSubscriptions,
  MdSystemUpdate,
  MdUpdate,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import useLoadUser from '../hooks/useLoadUser';
import ErrorMessage from '../components/ErrorMessage';
import { createOrUpdateUser } from '../api/userApi';
import { useState } from 'react';
import ProfileModal from '../components/modals/ProfileModal';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  const [userData, refetch, isLoading, isError, error] = useLoadUser();
  

  const { user } = useAuth();

  const handleAdmin = () => {
    const userInfo = { email: userData.email, status: 'requested' };
    createOrUpdateUser(userInfo);
    refetch();
  };

  const { displayName, email, photoURL, role, subscription, status } = userData;

  // handling error
  if (isError) return <ErrorMessage error={error} />;

  // handling loading state
  // if (isLoading) return <LoadingSpinner />;

  return (
    <div className='w-3/4 lg:w-1/2 mx-auto space-y-4 text-deep-ocean'>
      <Helmet>
        <title>Tech Insights || Profile</title>
      </Helmet>

      <div
        id='profile'
        className=' rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-3xl bg-yellow-50 opacity-75 mt-24'
      >
        <div className='p-4 lg:p-8 text-center lg:text-left'>
          <img
            className='block rounded-full shadow-xl mx-auto -mt-20 lg:-mt-20 h-28 w-28 lg:h-36 lg:w-36'
            src={photoURL}
            alt='Profile Photo'
          />
          {/* name */}
          <h1 className='text-3xl font-bold pt-4 lg:pt-0 flex justify-center gap-4 items-center lg:justify-between lg:max-w-md'>
            {displayName}

            <span title='Update your profile' onClick={closeModal}>
              <FaEdit className='text-green-lantern cursor-pointer' />
            </span>
            <ProfileModal
              isOpen={isOpen}
              closeModal={closeModal}
              userData={userData}
            />
          </h1>

          {/* border */}
          <div className='mx-auto lg:mx-0  w-2/3 lg:w-[90%] pt-2 border-b-2 border-green-lantern opacity-60'></div>

          {/* email */}
          <p className='pt-4 font-bold flex items-center justify-center  gap-3 lg:justify-start'>
            <BsEnvelopeAt size={20} className='text-green-lantern' />
            {email}
          </p>

          {/* login information */}
          <div className='lg:flex lg:gap-4 pt-3'>
            <p className='  text-xs lg:text-sm flex items-center justify-center lg:justify-start'>
              <span className='mr-2  font-wendy'> User Created : </span>
              {new Date(parseInt(user?.metadata?.createdAt)).toLocaleString()}
            </p>
            <p className='pt-1 text-xs lg:text-sm flex items-center justify-center lg:justify-start'>
              <span className='mr-2  font-wendy'> Last Login : </span>
              {new Date(parseInt(user?.metadata?.lastLoginAt)).toLocaleString()}
            </p>
          </div>

          {/* border */}
          <div className=' mt-4 w-1/2 lg:w-3/4 mx-auto border-b-2 border-dotted border-green-lantern opacity-25'></div>

          {/* subscription and user type */}
          <div className='flex flex-col justify-center items-center lg:items-start  gap-y-3 mt-8 font-semibold text-sm md:text-base'>
            <div className='flex items-center gap-2'>
              <FaUserCog size={20} className='text-green-lantern' />
              <i> Type : </i>
              {role === 'admin' ? (
                <div className='flex items-center'>
                  <span>Admin</span>
                  <em className='text-sm ml-4 text-green-lantern hidden md:flex'>
                    Congrats, you're an admin!
                  </em>
                </div>
              ) : (
                <>
                  <>
                    <span>User</span>
                  </>
                  <button
                    onClick={handleAdmin}
                    disabled={status === 'requested'}
                    className='text-xs px-2 py-1 rounded-md bg-green-lantern text-pure-white hover:bg-deep-ocean hover:rounded-full ml-4 disabled:cursor-not-allowed disabled:bg-gray-800'
                  >
                    {role === 'Requested'
                      ? 'Requested for Admin'
                      : ' Be an Admin'}
                  </button>
                </>
              )}
            </div>
            {/* subscription */}
            <>
              {role === 'admin' ? (
                <>
                  <span className=' mt-2 text-sm tracking-wider'>
                    As an admin, remember to oversee user activities, manage
                    content, and ensure the community follows the guidelines.
                    Your leadership is crucial for maintaining a positive
                    environment!
                  </span>
                </>
              ) : (
                <div className=' flex items-center gap-2'>
                  <MdSubscriptions size={20} className='text-green-lantern' />
                  <i> Subscription : </i>
                  {subscription === 'premium' ? (
                    <>
                      <span>Premium</span>
                      <span className='ml-2'>Enjoy your premium benefits!</span>
                    </>
                  ) : (
                    <div className='relative'>
                      <span>Normal</span>
                      <Link to='/subscription'>
                        <button className='text-xs px-2 py-1 rounded-md bg-green-lantern text-pure-white hover:bg-deep-ocean hover:rounded-full ml-4 absolute right-8 w-24 top-7 md:static cursor-pointer'>
                          Buy Premium
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          </div>

          {/* border */}
          <div className=' pt-12 border-b-2 border-green-lantern opacity-85'></div>

          {/* social links */}
          <div className='mt-6 pb-4 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between'>
            <a className='link' href='#' data-tippy-content='@facebook_handle'>
              <svg
                className='h-6 fill-current text-gray-600  '
                role='img'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Facebook</title>
                <path d='M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0' />
              </svg>
            </a>
            <a className='link' href='#' data-tippy-content='@twitter_handle'>
              <svg
                className='h-6 fill-current text-gray-600  '
                role='img'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Twitter</title>
                <path d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z' />
              </svg>
            </a>
            <a className='link' href='#' data-tippy-content='@github_handle'>
              <svg
                className='h-6 fill-current text-gray-600  '
                role='img'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>GitHub</title>
                <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
              </svg>
            </a>
            <a className='link' href='#' data-tippy-content='@unsplash_handle'>
              <svg
                className='h-6 fill-current text-gray-600  '
                role='img'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Unsplash</title>
                <path d='M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z' />
              </svg>
            </a>
            <a className='link' href='#' data-tippy-content='@dribble_handle'>
              <svg
                className='h-6 fill-current text-gray-600  '
                role='img'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Dribbble</title>
                <path d='M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z' />
              </svg>
            </a>
            <a className='link' href='#' data-tippy-content='@instagram_handle'>
              <svg
                className='h-6 fill-current text-gray-600  '
                role='img'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Instagram</title>
                <path d='M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' />
              </svg>
            </a>
            <a className='link' href='#' data-tippy-content='@youtube_handle'>
              <svg
                className='h-6 fill-current text-gray-600  '
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <title>YouTube</title>
                <path d='M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
