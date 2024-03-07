import { useSelector } from 'react-redux';
import { userData, isLoading } from '../store/store';
import { User } from '../store/store';

//We will need to map through all the data we receive from the MongoDB cluster
//and render this component
const UserIcon = () => {
    const data: User = useSelector(userData);

    return (
        <div className="userIconComponent">
            {/* should prolly have a placeholder image if they dont have an avatar */}
            <img src={data?.avatar} className="userIconImage" alt="" />
            <h5>{data.name.slice(0, data.name.indexOf(' '))}</h5>
        </div>
    );
};
