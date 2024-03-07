import { userData, isLoading } from '../store/store';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User } from '../store/store';

const UserProfile = () => {
    const data: User = useSelector(userData);
    const loading: boolean = useSelector(isLoading);

    return (
        <div className="userProfile">
            {!loading ? (
                <>
                    <div className="profileHeader">
                        <img src={data.avatar} alt="" className="avatar" />
                        <div className="profileUserAndName">
                            <h1>
                                Hello{' '}
                                {data.name.slice(0, data.name.indexOf(' '))} 👋🏼
                                !!
                            </h1>
                            <p>Username: {data.username}</p>
                            <p>Ranking: {data.ranking}</p>
                            <p>Reputation: {data.reputation}</p>
                        </div>
                    </div>
                    <NavLink to="/">
                        <Button>Back to Main Page</Button>
                    </NavLink>
                </>
            ) : (
                <>
                    <h1>Loading</h1>
                    <NavLink to="/">
                        <Button>Back to Main Page</Button>
                    </NavLink>
                </>
            )}
        </div>
    );
};

export default UserProfile;
