import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';

import Nui from '../../../util/Nui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Sanitize } from '../../../util/Parser';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        background: 'rgba(4, 24, 0, 0.5)',
        borderRadius: '8px',
        marginBottom: '8px',
        padding: '12px 16px',
        transition: 'background 0.15s ease',
        '&.clickable:hover': {
            background: 'rgba(49, 99, 33, 0.5)',
        },
    },
    action: {
        fontSize: 14,
        color: 'rgb(182, 236, 56)',
    },
    phw: {
        pointerEvents: 'none !important',
    },
    ph: {
        fontSize: 14,
        color: 'rgb(182, 236, 56) !important',
    },
    icon: {
        color: 'rgb(182, 236, 56)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle, rgba(74, 94, 38, 0.684) 0%, rgba(61, 79, 31, 0.256) 100%)',
        padding: '5px',
        height: '20px',
        width: '20px',
        borderStyle: 'solid',
        borderRadius: '3px',
        borderWidth: '0.15rem',
        borderColor: 'rgb(134, 164, 77)',
        marginRight: '10px',
    },
    disabled: {
        background: 'radial-gradient(circle, rgba(105, 46, 47, 0.089) 0%, rgba(105, 46, 47, 0.177) 100%) !important',
        borderColor: 'rgb(101, 44, 45) !important',
        cursor: 'not-allowed',
        '& $icon': {
            color: 'rgb(186, 81, 84)',
            background: 'radial-gradient(circle, rgba(133, 58, 59, 0.089) 0%, rgba(105, 46, 47, 0.177) 100%)',
            borderColor: 'rgb(137, 60, 61)',
        },
    },
}));

export default ({ index, item }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onClick = () => {
        if (item.submenu) {
            Nui.send('ListMenu:SubMenu', {
                submenu: item.submenu,
            });
            dispatch({
                type: 'CHANGE_MENU',
                payload: {
                    menu: item.submenu,
                },
            });
        } else if (item.event) {
            Nui.send('ListMenu:Clicked', {
                event: item.event,
                data: item.data,
            });
        }
    };

    const onAction = (event) => {
        Nui.send('ListMenu:Clicked', {
            event: event,
            data: item.data,
        });
    };

    return (
        <ListItem
            button={
                !Boolean(item.actions) &&
                (Boolean(item.event) || Boolean(item.submenu))
            }
            disabled={Boolean(item.disabled)}
            divider
            className={`${classes.wrapper}${
                !Boolean(item.actions) &&
                (Boolean(item.event) || Boolean(item.submenu))
                    ? ' clickable'
                    : ''
            }${Boolean(item.disabled) ? ' ' + classes.disabled : ''}`}
            onClick={
                !Boolean(item.actions) &&
                (Boolean(item.event) || Boolean(item.submenu))
                    ? onClick
                    : null
            }
        >
            {item.icon && (
                <div className={classes.icon}>
                    <FontAwesomeIcon icon={item.icon} />
                </div>
            )}
            <ListItemText
                primary={item.label}
                secondary={<span>{Sanitize(item.description)}</span>}
                primaryTypographyProps={{
                    style: { color: 'white', fontSize: '1rem', fontWeight: 400 }
                }}
                secondaryTypographyProps={{
                    style: { color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }
                }}
            />
            {Boolean(item.submenu) ? (
                <ListItemSecondaryAction className={classes.phw}>
                    <IconButton disabled className={classes.ph}>
                        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                    </IconButton>
                </ListItemSecondaryAction>
            ) : Boolean(item.actions) ? (
                <ListItemSecondaryAction>
                    {item.actions.map((action, k) => {
                        return (
                            <IconButton
                                key={`${index}-action-${k}`}
                                onClick={() => onAction(action.event)}
                                className={classes.action}
                            >
                                <FontAwesomeIcon icon={['fas', action.icon]} />
                            </IconButton>
                        );
                    })}
                </ListItemSecondaryAction>
            ) : null}
        </ListItem>
    );
};
