import React, { Suspense, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { USERS_INFO } from '../../queries/userInfo';
import styles from './users.module.scss';
import { Loader } from '../loader/Loader';
import Head from 'next/head';

const UserDetails = React.lazy(() => import('../userDetails/UserDetails'));

export const Users = () => {
    const { loading, error, data, fetchMore } = useQuery(USERS_INFO, {
        variables: { offset: null }
    });

    const loadMoreRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadMoreRef.current?.scrollIntoView({ behavior: "smooth" }
        )
    }, [data])

    const loadMoreUsers = () => {
        return fetchMore({
            variables: { offset: data.users.nodes.length },
            updateQuery: (prevResult: any, { fetchMoreResult }: any) => {
                fetchMoreResult.users.nodes = [
                    ...prevResult.users.nodes,
                    ...fetchMoreResult.users.nodes
                ];
                return fetchMoreResult;
            }
        });
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }

    return data?.users?.nodes.length > 0 ?
        <React.Fragment>
            <Head>
                <title>Users Dashboard</title>
            </Head>
            <Suspense fallback={<div>Loading...</div>}>
                <h2 className={styles.title} data-test-id='users-list-title'>Users Dashboard</h2>
                <div className={styles.container} data-test-id='users-list'>
                    {data.users.nodes.map((userDetails: any, index: number) => {
                        return <UserDetails key={`user-${index}`} user={userDetails} />
                    })}
                </div>
            </Suspense>
            <div className={styles.loadMoreContainer} ref={loadMoreRef}>
                <button className={styles.loadMore} onClick={() => loadMoreUsers()} data-test-id="users-action-loadMore"> Load more </button>
            </div>
        </React.Fragment>
        : <div>No data found</div>
}