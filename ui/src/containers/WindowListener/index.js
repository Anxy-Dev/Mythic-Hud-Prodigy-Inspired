import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const WindowListener = props => {
    const handleEvent = event => {
        const { dispatch } = props;
        const { type, data } = event.data;
        if (type != null) dispatch({ type, payload: { ...data } });
    };

    const handleNuiMessage = event => {
        const { action, position } = event.data;
        if (action === 'loadSpeedometerPosition' && position) {
            window.postMessage({ type: 'LOAD_SPEEDOMETER_POSITION', position }, '*');
        } else if (action === 'resetSpeedometerPosition') {
            window.postMessage({ type: 'RESET_SPEEDOMETER_POSITION' }, '*');
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleEvent);
        window.addEventListener('message', handleNuiMessage);

        // returned function will be called on component unmount
        return () => {
            window.removeEventListener('message', handleEvent);
            window.removeEventListener('message', handleNuiMessage);
        };
    }, []);

    return React.Children.only(props.children);
};

WindowListener.propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default connect(null, null)(WindowListener);
