import React from 'react';
import styles from './userDetails.module.scss';

interface IProps {
    user: {
        fullName: string,
        address: string,
        email: string,
        phone: string
    }
}

const UserDetails = (props: IProps) => {
    const { fullName, address, email, phone } = props.user;

    return (
        <div role='user-details' className={styles.card}>
            <h3>{fullName}</h3>
            <p className={styles.email}>
                {email}
            </p>
            <p className={styles.address}>{address}</p>
            <p>{phone}</p>
        </div>
    );
}

export default UserDetails;
