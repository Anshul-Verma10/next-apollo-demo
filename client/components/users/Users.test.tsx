import { render, cleanup, fireEvent } from '@testing-library/react';
import { Users } from './Users';
import { MockedProvider } from '@apollo/react-testing';
import { USERS_INFO } from '../../queries/userInfo';

const mocks = [
    {
        request: {
            query: USERS_INFO,
            variables: { offset: null }
        },
        result: {
            data: {
                users: {
                    nodes: [{
                        "id": "0",
                        "firstName": "Abdul",
                        "lastName": "Stroman",
                        "address": "5597 Juwan Parkway Kevonstad, NC 16988",
                        "email": "Barney.Bayer@yahoo.com",
                        "phone": "935-130-5237"
                    }]
                }
            }
        }
    }
];

const loadMoreMocks = [
    {
        request: {
            query: USERS_INFO,
            variables: { offset: 1 }
        },
        result: {
            data: {
                users: {
                    nodes: [{
                        "id": "0",
                        "firstName": "Abdul",
                        "lastName": "Stroman",
                        "address": "5597 Juwan Parkway Kevonstad, NC 16988",
                        "email": "Barney.Bayer@yahoo.com",
                        "phone": "935-130-5237"
                    },{
                        "id": "1",
                        "firstName": "Brody",
                        "lastName": "Boehm",
                        "address": "4126 Lizzie Inlet South Jeffrybury, SC 53381",
                        "email": "Roosevelt_Doyle@hotmail.com",
                        "phone": "638-477-2562"
                    }]
                }
            }
        }
    }
];


describe('Users dashboard component', () => {

    afterEach(cleanup);

    it('render user dashboard', async () => {
        const { findByText } = render(
            <MockedProvider mocks={mocks} >
                <Users />
            </MockedProvider>
        )
        expect(await findByText('Users Dashboard')).toBeInTheDocument();
    })

    it('render users on load More', async () => {
        const { findByText, findAllByRole } = render(
            <MockedProvider mocks={[...mocks, ...loadMoreMocks]} addTypename={false}>
                <Users />
            </MockedProvider>
        )
        fireEvent.click(await findByText('Load more'))
        const items = await findAllByRole('user-details')
        expect(items).toHaveLength(1);
    })
})