import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { FaCompass, FaMapMarkerAlt, FaMap } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
    hudWrapper: {
        position: 'absolute',
        top: 15,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 8,
        zIndex: 1000,
    },
    pill: {
        background: '#1a1a1aee',
        padding: '6px 14px',
        borderRadius: 20,
        color: 'white',
        fontSize: 14,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        boxShadow: '0 0 8px rgba(0,0,0,0.5)',
    },
    iconDot: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: '#92db24',
        display: 'inline-block',
        boxShadow: '0 0 0.5vh #92db24',
    },
}));

const LocationHUD = () => {
    const classes = useStyles();
    const time = useSelector((state) => state.location.time);
    const isShowing = useSelector((state) => state.location.showing);
    const location = useSelector((state) => state.location.location);
    const isBlindfolded = useSelector((state) => state.app.blindfolded);

    if (!isShowing || isBlindfolded) return null;

    return (
        <div className={classes.hudWrapper}>
            <div className={classes.pill}>
                <FaCompass style={{ fontSize: 14, marginRight: 4, color: '#92db24', filter: 'drop-shadow(0 0 4px rgba(146, 219, 36, 0.8))' }} />
                {location.direction}
            </div>
            <div className={classes.pill}>
                <FaMapMarkerAlt style={{ fontSize: 14, marginRight: 4, color: '#92db24', filter: 'drop-shadow(0 0 4px rgba(146, 219, 36, 0.8))' }} />
                {location.main}
            </div>
            <div className={classes.pill}>
                <FaMap style={{ fontSize: 14, marginRight: 4, color: '#92db24', filter: 'drop-shadow(0 0 4px rgba(146, 219, 36, 0.8))' }} />
                {location.area}
            </div>
        </div>
    );
};

export default LocationHUD;