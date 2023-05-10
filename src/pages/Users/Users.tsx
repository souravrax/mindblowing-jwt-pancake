import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_USERS_URL } from '../../constants';
import { tokenManager } from '../../Auth/TokenManager';
import { VerticalContainer } from '../../styles/Global.styles';
import { Table } from 'baseui/table-semantic';
import { Pagination } from 'baseui/pagination';
import useAuth from '../../Auth/useAuth';
import { DisplayLarge } from 'baseui/typography';

const axiosInstance = axios.create({
    withCredentials: true,
    responseType: 'json',
    baseURL: 'http://localhost:3003',
});

export default function Users() {
    const [pageNumber, setPageNumber] = useState(1);
    const { isUserLoggedIn, refreshToken } = useAuth();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            if (!(await isUserLoggedIn())) {
                await refreshToken();
            }
            try {
                const response = await axiosInstance.get(GET_USERS_URL, {
                    params: {
                        page: pageNumber,
                    },
                    headers: {
                        Authorization: `Bearer ${tokenManager.getToken()}`,
                    },
                });
                console.log(response.data.data);
                setData(
                    response.data.data.map((d: { [x: string]: unknown }) => [
                        d['id'],
                        d['email'],
                        d['first_name'],
                        d['last_name'],
                    ])
                );
            } catch (e) {
                console.log(e);
            }
        };
        fetchUsers();
    }, [pageNumber]);

    return (
        <VerticalContainer>
            <DisplayLarge>Users</DisplayLarge>
            <Table
                columns={['ID', 'Email', 'First Name', 'Last Name']}
                data={data}
                isLoading={data.length === 0}
            />
            <Pagination
                numPages={2}
                currentPage={pageNumber}
                onPageChange={({ nextPage }) => setPageNumber(nextPage)}
            />
        </VerticalContainer>
    );
}
