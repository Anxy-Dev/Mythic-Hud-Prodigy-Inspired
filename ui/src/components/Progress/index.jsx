import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, LinearProgress, Fade } from '@mui/material';
import { withStyles, makeStyles } from '@mui/styles';
import useInterval from 'react-useinterval';

import Nui from '../../util/Nui';

const useStyles = makeStyles((theme) => ({
    wrapper: {
<<<<<<< HEAD
        width: '19%',
        height: 'fit-content',
        position: 'absolute',
        bottom: '5%',
        left: 0,
        right: 0,
        margin: 'auto',
        fontFamily: '"Pathway Gothic One", sans-serif',
        fontSize: '1.7vh',
    },
    label: {
        color: '#ffffff',
        fontSize: '1.7vh',
        lineHeight: '4vh',
        fontWeight: 'bold',
        textShadow: '0 0 5px #000',
    },
    percentage: {
        color: '#9ACD32',
        fontSize: '1.7vh',
        lineHeight: '4vh',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    progressbar: {
        transition: 'width 0.3s ease-out !important',
=======
        width: '100%',
        maxWidth: 500,
        height: 'fit-content',
        position: 'absolute',
        bottom: '10%',
        left: 0,
        right: 0,
        margin: 'auto',
    },
    label: {
        color: theme.palette.text.main,
        fontSize: 18,
        textShadow: '0 0 5px #000',
    },
    progressbar: {
        transition: 'none !important',
>>>>>>> 3af374841887f01b11bef2f6d427b568b14fbdc5
    },
}));

const mapStateToProps = (state) => ({
    showing: state.progress.showing,
    failed: state.progress.failed,
    cancelled: state.progress.cancelled,
    finished: state.progress.finished,
    label: state.progress.label,
    duration: state.progress.duration,
    startTime: state.progress.startTime,
});

export default connect(mapStateToProps)(
    ({ cancelled, finished, failed, label, duration, startTime, dispatch }) => {
        const classes = useStyles();

        const BorderLinearProgress = withStyles((theme) => ({
            root: {
<<<<<<< HEAD
                height: '0.9vh',
                borderRadius: 4,
                background: `repeating-linear-gradient(
                    135deg,
                    rgba(130, 134, 134, 0.49),
                    rgba(130, 134, 134, 0.49) 1.4px,
                    transparent 3px,
                    transparent 4px
                )`,
            },
            colorPrimary: {
                backgroundColor: 'transparent',
            },
            bar: {
                borderRadius: 4,
                backgroundColor:
                    cancelled || failed
                        ? '#ff4444'
                        : finished
                        ? '#79EF0B'
                        : '#79EF0B',
                boxShadow: '0px 0px 30px rgba(194, 255, 73, 0.8)',
                transition: 'width 0.3s ease-out',
=======
                height: 8,
            },
            colorPrimary: {
                backgroundColor: theme.palette.secondary.dark,
            },
            bar: {
                borderRadius: 5,
                backgroundColor:
                    cancelled || failed
                        ? theme.palette.primary.main
                        : finished
                        ? theme.palette.success.main
                        : theme.palette.info.main,
>>>>>>> 3af374841887f01b11bef2f6d427b568b14fbdc5
            },
        }))(LinearProgress);

        const [curr, setCurr] = useState(0);
        const [fin, setFin] = useState(true);
        const [to, setTo] = useState(null);

        useEffect(() => {
            setCurr(0);
            setFin(true);
            if (to) {
                clearTimeout(to);
            }
        }, [startTime]);

        useEffect(() => {
            return () => {
                if (to) clearTimeout(to);
            };
        }, []);

        useEffect(() => {
            return () => {
                if (to) clearTimeout(to);
            };
        }, []);

        useEffect(() => {
            if (cancelled || finished || failed) {
                setCurr(0);
                setTo(
                    setTimeout(() => {
                        setFin(false);
                    }, 2000),
                );
            }
        }, [cancelled, finished, failed]);

        const tick = () => {
            if (failed || finished || cancelled) return;

            if (curr + 10 > duration) {
                dispatch({
                    type: 'FINISH_PROGRESS',
                });
            } else {
                setCurr(curr + 10);
            }
        };

        const hide = () => {
            dispatch({
                type: 'HIDE_PROGRESS',
            });
        };

        useInterval(tick, curr > duration ? null : 10);
        return (
            <Fade in={fin} duration={1000} onExited={hide}>
                <div className={classes.wrapper}>
                    <Grid container className={classes.label}>
                        <Grid item xs={6}>
                            {finished
                                ? 'Finished'
                                : failed
                                ? 'Failed'
                                : cancelled
<<<<<<< HEAD
                                ? 'CANCELLED'
                                : label}
                        </Grid>
                        <Grid item xs={6} className={classes.percentage}>
                            {!cancelled && !finished && !failed && (
                                <span>
                                    {Math.round((curr / duration) * 100)}%
                                </span>
=======
                                ? 'Cancelled'
                                : label}
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            {!cancelled && !finished && !failed && (
                                <small>
                                    {Math.round(curr / 1000)}s /{' '}
                                    {Math.round(duration / 1000)}s
                                </small>
>>>>>>> 3af374841887f01b11bef2f6d427b568b14fbdc5
                            )}
                        </Grid>
                    </Grid>
                    <BorderLinearProgress
                        variant="determinate"
                        classes={{
                            determinate: classes.progressbar,
                            bar: classes.progressbar,
                            bar1: classes.progressbar,
                        }}
                        value={
                            cancelled || finished || failed
                                ? 100
                                : (curr / duration) * 100
                        }
                    />
                </div>
            </Fade>
        );
    },
);
