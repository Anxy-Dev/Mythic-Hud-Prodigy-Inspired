import React, { useState, useEffect } from 'react';
import { Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import useKeypress from 'react-use-keypress';
import { debounce } from 'lodash';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Alumni Sans", sans-serif',
    },
    circleMenu: {
        position: 'relative',
        width: '600px',
        height: '600px',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '15%',
    },
    menuItemsContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItemWrapper: {
        position: 'absolute',
        width: '80px',
        height: '75px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transformOrigin: 'center',
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
    },
    menuItem: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(4, 24, 0, 0.5)',
        border: '1px solid rgba(11, 63, 0, 0.5)',
        color: 'white',
        borderRadius: '15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '26px',
        transition: 'transform 0.1s, background-color 0.1s',
        transformOrigin: 'center',
        cursor: 'pointer',
        '& i': {
            pointerEvents: 'none',
        },
        '&:hover': {
            transform: 'scale(1.2)',
            backgroundColor: 'rgba(49, 99, 33, 0.5)',
            border: '1px solid #6f9b09ec',
            zIndex: 10,
        },
    },
    closeButton: {
        position: 'absolute',
        width: '80px',
        height: '75px',
        backgroundColor: 'rgba(4, 24, 0, 0.5)',
        border: '1px solid rgba(11, 63, 0, 0.5)',
        color: 'white',
        borderRadius: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '26px',
        cursor: 'pointer',
        transition: 'transform 0.1s, background-color 0.1s',
        zIndex: 100,
        '&:hover': {
            transform: 'scale(1.2)',
            backgroundColor: 'rgba(49, 99, 33, 0.5)',
            border: '1px solid #6f9b09ec',
            zIndex: 100,
        },
    },
}));

const Interaction = () => {
    const classes = useStyles();
    const showing = useSelector((state) => state.interaction.show);
    const menuItems = useSelector((state) => state.interaction.menuItems);
    const layer = useSelector((state) => state.interaction.layer);
    
    const [itemPositions, setItemPositions] = useState([]);

    useKeypress(['F1', 'Escape'], () => {
        if (!showing) return;
        else Nui.send('Interaction:Hide');
    });

    //Yes this is stupid, i dont know why the lib fires onClick twice?
    const trigger = debounce(function (item) {
        Nui.send('Interaction:Trigger', item);
    }, 0);

    const back = async () => {
        if (layer === 0) return await Nui.send('Interaction:Hide');
        await Nui.send('Interaction:Back');
    };

    useEffect(() => {
        if (showing && menuItems.length > 0) {
            const sortedItems = [...menuItems].sort((a, b) => 
                a.id < b.id ? -1 : a.id > b.id ? 1 : 0
            );
            
            const itemCount = sortedItems.length;
            const radius = 240;
            let positions;

            if (itemCount === 3) {
                // Triangle layout: top middle, bottom left, bottom right
                positions = sortedItems.map((item, index) => {
                    let translateX, translateY;
                    if (index === 0) {
                        // Top middle
                        translateX = 0;
                        translateY = -radius;
                    } else if (index === 1) {
                        // Bottom left
                        translateX = -radius * 0.866;
                        translateY = radius * 0.5;
                    } else {
                        // Bottom right
                        translateX = radius * 0.866;
                        translateY = radius * 0.5;
                    }
                    return {
                        ...item,
                        translateX,
                        translateY,
                    };
                });
            } else {
                // Circle layout for other counts
                const angleIncrement = 360 / itemCount;
                positions = sortedItems.map((item, index) => {
                    const angle = angleIncrement * index;
                    const radians = angle * (Math.PI / 180);
                    const translateX = radius * Math.cos(radians);
                    const translateY = radius * Math.sin(radians);
                    
                    return {
                        ...item,
                        translateX,
                        translateY,
                    };
                });
            }
            
            setItemPositions(positions);
        }
    }, [showing, menuItems]);

    if (!showing) return null;

    return (
        <Fade in={showing} timeout={250}>
            <div className={classes.container}>
                <div className={classes.circleMenu}>
                    <div
                        className={classes.closeButton}
                        onClick={() => back()}
                    >
                        <FontAwesomeIcon icon={['fas', 'xmark']} />
                    </div>
                    <div className={classes.menuItemsContainer}>
                        {itemPositions.map((item, index) => (
                            <div
                                key={item.id}
                                className={classes.menuItemWrapper}
                                style={{
                                    transform: `translate(${item.translateX}px, ${item.translateY}px)`,
                                }}
                            >
                                <div
                                    className={classes.menuItem}
                                    onClick={() => trigger(item)}
                                >
                                    {item.label && (
                                        <div style={{ fontSize: '14px', marginBottom: '4px', textAlign: 'center' }}>
                                            {item.label}
                                        </div>
                                    )}
                                    <FontAwesomeIcon
                                        icon={item.icon ?? 'question'}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fade>
    );
};
export default Interaction;
