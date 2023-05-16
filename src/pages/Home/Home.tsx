import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { VerticalContainer } from "../../styles/Global.styles";
import { Table } from "baseui/table-semantic";
import { Pagination } from "baseui/pagination";
import useAuth from "../../auth/useAuth";
import { DisplayLarge, DisplayMedium } from "baseui/typography";

const axiosInstance = axios.create({
    withCredentials: true,
    responseType: "json",
    baseURL: process.env.BASE_URL,
});

export default function Home() {
    const [pageNumber, setPageNumber] = useState(1);
    const { isUserLoggedIn, accessToken, refreshToken } = useAuth();
    const [data, setData] = useState([]);
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         if (!isUserLoggedIn) {
    //             await refreshToken();
    //         }
    //         try {
    //             const response = await axiosInstance.get(
    //                 API_URL.GET_USERS_URL,
    //                 {
    //                     params: {
    //                         page: pageNumber,
    //                     },
    //                     headers: {
    //                         Authorization: `Bearer ${accessToken}`,
    //                     },
    //                 }
    //             );
    //             console.log(response.data.data);
    //             setData(
    //                 response.data.data.map((d: { [x: string]: unknown }) => [
    //                     d["id"],
    //                     d["email"],
    //                     d["first_name"],
    //                     d["last_name"],
    //                 ])
    //             );
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
    //     fetchUsers();
    // }, [pageNumber]);

    return (
        <div>
            <DisplayMedium>Home</DisplayMedium>
            <Table
                columns={["ID", "Email", "First Name", "Last Name"]}
                data={data}
                isLoading={data.length === 0}
            />
            <Pagination
                numPages={2}
                currentPage={pageNumber}
                onPageChange={({ nextPage }) => setPageNumber(nextPage)}
            />
        </div>
    );
}
