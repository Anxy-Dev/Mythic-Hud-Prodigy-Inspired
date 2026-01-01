import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fade, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useKeypress from 'react-use-keypress';
import Nui from '../../util/Nui';

const useStyles = makeStyles((theme) => ({
    outer: {
        width: '100%',
        position: 'absolute',
        bottom: '50%',
        textAlign: 'center',
        transform: 'translateY(50%)',
    },
    menuOuter: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    menuList: {
        listStyle: 'none',
        width: 'fit-content',
        height: 'fit-content',
        position: 'absolute',
        left: '52%',
        top: '50%',
        transform: 'translateY(-50%)',
        margin: 0,
        padding: 0,
        textAlign: 'left',
        fontSize: 16,
        '&::before': {
            content: '""',
            position: 'absolute',
            right: '100%',
            top: '50%',
            width: '2px',
            height: 'calc(100% - 20px)',
            background: 'rgba(121, 239, 11, 0.4)',
            transform: 'translate(-38px, -50%)',
        },
    },
    menuItem: {
        color: 'white',
        marginBottom: 10,
        padding: '8px 12px',
        backgroundColor: 'rgba(4, 24, 0, 0.5)',
        border: '1px solid rgba(11, 63, 0, 0.5)',
        borderRadius: '4px',
        position: 'relative',
        transition: 'background 0.15s ease, border 0.15s ease',
        fontWeight: 'normal',
        textShadow: '0 0 5px #000',
        fontFamily: '"Poppins", sans-serif',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: 'rgba(49, 99, 33, 0.5)',
            border: '1px solid #6f9b09ec',
            cursor: 'pointer',
        },
        '& svg': {
            marginRight: 8,
            color: 'rgb(182, 236, 56)',
            fontSize: '14px',
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            right: '100%',
            top: '50%',
            width: '40px',
            height: '2px',
            background: 'linear-gradient(to left, rgba(121, 239, 11, 0.8), rgba(121, 239, 11, 0.4))',
            transform: 'translateY(-50%)',
        },
    },
    icon: {
        fontSize: '1rem',
        transition: '.3s',
        color: '#79EF0B',
        filter: 'drop-shadow(0 0 10px rgba(121, 239, 11, 0.8))',
    },
    focused: {
        fontSize: '1.5rem',
        color: '#79EF0B',
        filter: 'drop-shadow(0 0 15px rgba(121, 239, 11, 1))',
    },
}));

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showing = useSelector((state) => state.thirdEye.showing);
    const icon = useSelector((state) => state.thirdEye.icon);
    const menuOpen = useSelector((state) => state.thirdEye.menuOpen);
    const menu = useSelector((state) => state.thirdEye.menu);

    const menuButtonClick = (e, event, data) => {
        e.stopPropagation();
        Nui.send('targetingAction', {
            event,
            data,
        });
    };

    const closeMenu = () => {
        Nui.send('targetingAction', false);
    };

    useKeypress(['Escape', 'Backspace'], () => {
        if (!showing) return;
        else closeMenu();
    });

    const menuElements = menu.map((button, i) => {
        return (
            <li
                key={i}
                color="secondary"
                onClick={(e) => menuButtonClick(e, button.event, button.data)}
                variant="contained"
                className={classes.menuItem}
            >
                {button.icon && <FontAwesomeIcon icon={button.icon} />}
                {button.text}
            </li>
        );
    });

    if (menuElements.length <= 1) {
        menuElements.push(<div className={classes.menuButton} key={'x'}></div>);
        menuElements.reverse();
    }

    let menuRadius = 50 + menuElements.length * 1.8 * 10;

    if (menuRadius < 80) {
        menuRadius = 80;
    } else if (menuRadius > 900) {
        menuRadius = 900;
    }

    return (
        <Fragment>
            <Fade in={showing} duration={1500}>
                <div className={classes.outer}>
                    <FontAwesomeIcon
                        className={`${icon && classes.focused} ${classes.icon}`}
                        icon={icon ? icon : 'circle'}
                    />
                    <Fade
                        in={menuOpen && menuElements.length > 0}
                        duration={1500}
                    >
                        <ul className={classes.menuList}>{menuElements}</ul>
                    </Fade>
                </div>
            </Fade>
        </Fragment>
    );
};
