import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Notification = ({ icon, trigger, message }) => {
    const darkMode = useSelector(state => state.darkMode.darkMode)

    return (
      <div className={`absolute bottom-2 right-2 p-4 rounded-lg z-50 bg-primaryDark-light dark:bg-primary-dark flex justify-center items-center gap-2 ${trigger ? 'visible' : 'invisible'} transition ease-in-out duration-300`}>
        <span className="w-12 h-12 bg-green-600 rounded-full flex justify-center items-center">
          {icon}
        </span>
        <p className="text-lg font-semibold text-secondaryDark dark:text-secondary">{message}</p>
      </div>
    )
}

Notification.propTypes = {
    icon: PropTypes.element,
    trigger: PropTypes.bool,
    message: PropTypes.string
};

export default Notification;