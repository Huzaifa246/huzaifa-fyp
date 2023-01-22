import React from 'react';

const PageNotFound = () => {
    return (
        <>
            <h1 style={{
                textAlign: 'center',
                color: '#006699'
            }}>Error 404, Page Not Found</h1>
            <h3 style={{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.3)'
            }}>The link may be broken, or the page may have been removed.</h3>
            <img style={{
                width: '80%',
                height: '60%',
                display: 'block',
                margin: '-15px auto 0px auto'
            }} src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="not found" />
        </>
    )
}

export default PageNotFound;