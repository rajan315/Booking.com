import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <div className="bg-blue-800 py-3 md:py-6">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Booking.com</Link>
                </span>
                <span className="flex mt-2 md:mt-0">
                    {isLoggedIn ? (
                        <>
                            <Link className="flex items-center text-white px-3 font-bold hover:bg-blue-600" to="/my-bookings">
                                My Bookings
                            </Link>
                            <Link className="flex items-center text-white px-3 font-bold hover:bg-blue-600" to="/my-hotels">
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link
                            to="/sign-in"
                            className="flex bg-white items-center text-blue-600 px-3 py-1 md:px-3 md:py-1 font-bold hover:bg-gray-200"
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
