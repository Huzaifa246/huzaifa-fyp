import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
    heading: {
        textAlign: 'center',
        color: '#006699'
    },
    text: {
        textAlign: 'center',
        color: 'rgba(0,0,0,0.3)'
    },
    image: {
        width: '80%',
        height: '60%',
        display: 'block',
        margin: '-15px auto 0px auto'
    }
});

const PageNotFound = () => {
    const styles = useStyles();
    return (
        <>
            <h1 className={styles.heading}>Error 404, Page Not Found</h1>
            <h3 className={styles.text}>The link may be broken, or the page may have been removed.</h3>
            <img className={styles.image} src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="not found" />
        </>
    )
}

export default PageNotFound;