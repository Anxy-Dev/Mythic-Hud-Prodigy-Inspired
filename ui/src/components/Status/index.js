import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { makeStyles, withTheme } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
    leftDiv: {
        position: 'absolute',
        top: '5vh',
        left: '0vh',
        width: '50%',
        height: '90%',
        transform: 'perspective(450px) rotateY(2.5deg)',
    },
    rightDiv: {
        position: 'absolute',
        top: '5vh',
        right: '0vh',
        width: '50%',
        height: '90%',
        transform: 'perspective(450px) rotateY(-2.5deg)',
    },
    barsWrapper: {
        position: 'absolute',
        bottom: '5vh',
        left: '5vh',
        width: '28vh',
        height: 'auto',
    },
    wasteWrapper: {
        position: 'absolute',
        top: '0vh',
        left: '0vh',
        width: '100%',
        height: 'auto',
    },
    barWrapper: {
        position: 'relative',
        marginBottom: '0.5vh',
        display: 'flex',
        alignItems: 'center',
        height: '2.5vh',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.815)',
        fontSize: '2vh',
        marginRight: '1.5vh',
        marginLeft: '-0.5vh',
        minWidth: '2.5vh',
        textAlign: 'center',
    },
    barTxt: {
        position: 'absolute',
        top: '50%',
        left: '3.5vh',
        color: '#92db24',
        textShadow: '1px 1px black',
        fontSize: '1.8vh',
        fontWeight: 'bold',
        transform: 'translate(-50%, -50%)',
    },
    barBase: {
        position: 'absolute',
        top: '0.8vh',
        right: '0vh',
        width: '23vh',
        height: '0.75vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '0.2vh',
    },
    healthbar: {
        position: 'relative',
        height: '100%',
        backgroundColor: '#92db24',
        boxShadow: '0 0 0.5vh #92db24',
        transition: 'width 0.2s ease',
    },
    armorBarWrapper: {
        position: 'absolute',
        top: '0.8vh',
        right: '0vh',
        width: '23vh',
        height: '0.5vh',
    },
    armorBar: {
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        transition: 'width 0.2s ease',
    },
    armorBarBase: {
        position: 'absolute',
        height: '100%',
        width: '23vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, auto)',
        gap: '0.5vh',
    },
    armorBarPill: {
        borderRadius: '0.5vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    statWrapper: {
        position: 'absolute',
        top: '50%',
        left: '29vh',
        width: '17vh',
        height: 'auto',
        transform: 'translateY(-50%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        gap: '0.5vh',
    },
    stat: {
        position: 'relative',
        height: '3vh',
    },
    statBarBase: {
        position: 'absolute',
        width: '0.4vh',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    statBar: {
        position: 'absolute',
        bottom: '0vh',
        width: '100%',
        transition: 'height 0.2s ease',
    },
    barIcon: {
        position: 'absolute',
        fontSize: '2vh',
        right: '0vh',
        width: '3.2vh',
        top: '0.5vh',
        textAlign: 'center',
    },
    boostBar: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        bottom: '0vh',
        left: '0vh',
        zIndex: 10,
        overflow: 'hidden',
    },
    boostBarFill: {
        position: 'absolute',
        bottom: '0vh',
        left: '0vh',
        width: '100%',
        transition: 'height 0.2s ease',
        background: 'linear-gradient(to top, #FFD700, #FFA500)',
        boxShadow: '0 0 0.5vh #FFD700',
        borderRadius: '0.1vh',
    },
    talkingIcon: {
        position: 'absolute',
        bottom: '12vh',
        right: '5vh',
        fontSize: '3vh',
        color: 'yellowgreen',
        textShadow: '0 0 2px yellowgreen',
    },
}));

export default withTheme(() => {
    const classes = useStyles();
    const theme = useTheme();

    const config = useSelector((state) => state.hud.config);
    const inVeh = useSelector((state) => state.vehicle.showing);
    const isDead = useSelector((state) => state.status.isDead);
    const health = useSelector((state) => state.status.health);
    const armor = useSelector((state) => state.status.armor);
    const statuses = useSelector((state) => state.status.statuses);
    const isOnPhone = useSelector((state) => state.status.isOnPhone || false);
    const isOnRadio = useSelector((state) => state.status.isOnRadio || false);

    const GetHealth = () => {
        return (
            <div className={classes.barWrapper}>
                <FontAwesomeIcon icon="heart" className={classes.icon} style={{ color: health === 0 ? 'red' : 'rgba(255, 255, 255, 0.815)' }} />
                <span className={classes.barTxt} style={{ color: health === 0 ? 'red' : '#92db24' }}>{health}</span>
                <div className={classes.barBase} style={{ boxShadow: health === 0 ? '0 0 1vh red' : 'none' }}>
                    <div className={classes.healthbar} style={{ width: `${health}%` }} />
                </div>
            </div>
        );
    };

    const GetArmor = () => {
        if (armor <= 0 || isDead) return null;
        return (
            <div className={classes.barWrapper}>
                <FontAwesomeIcon icon="shield" className={classes.icon} style={{ color: '#2489db' }} />
                <span className={classes.barTxt} style={{ color: '#2489db' }}>{armor}</span>
                <div className={classes.armorBarWrapper}>
                    <div className={classes.armorBarBase}>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={classes.armorBarPill} />
                        ))}
                    </div>
                    <div className={classes.armorBar} style={{ width: `${armor}%` }}>
                        <div className={classes.armorBarBase}>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={classes.armorBarPill} style={{ backgroundColor: '#2489db', boxShadow: '0 0 0.5vh #2489db' }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const statusElements = statuses
        .sort((a, b) => a.options.id - b.options.id)
        .map((status, i) => {
            if (
                (status.value >= 90 && status?.options?.hideHigh) ||
                (status.value == 0 && status?.options?.hideZero) ||
                (isDead && !status?.options?.visibleWhileDead)
            )
                return null;

            const hasBoost = status?.options?.progressModifier !== undefined;
            const boostValue = status?.options?.progressModifier || 0;

            return (
                <div key={i} className={classes.stat}>
                    <div className={classes.statBarBase}>
                        <div 
                            className={classes.statBar} 
                            style={{
                                height: `${status.value}%`,
                                backgroundColor: status.color || 'rgb(139, 91, 252)',
                                boxShadow: `0 0 0.5vh ${status.color || 'rgb(139, 91, 252)'}`,
                            }}
                        />
                    </div>
                    {hasBoost && (
                        <div className={classes.boostBar}>
                            <div 
                                className={classes.boostBarFill}
                                style={{
                                    height: `${boostValue}%`,
                                }}
                            />
                        </div>
                    )}
                    <FontAwesomeIcon 
                        icon={status.icon || 'question'} 
                        className={classes.barIcon}
                    />
                </div>
            );
        }).filter(Boolean);

    return (
        <>
            <div className={classes.leftDiv}>
                <div className={classes.barsWrapper}>
                    <div className={classes.wasteWrapper}>
                        {GetArmor()}
                        {GetHealth()}
                        <div className={classes.statWrapper}>
                            {statusElements}
                        </div>
                    </div>
                </div>
            </div>
            
            {isOnPhone && (
                <FontAwesomeIcon icon="phone" className={classes.talkingIcon} />
            )}
            {isOnRadio && !isOnPhone && (
                <FontAwesomeIcon icon="walkie-talkie" className={classes.talkingIcon} />
            )}
        </>
    );
});
