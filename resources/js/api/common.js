import axios from "axios";

import { API_URL } from "../constants/";

const authHeader = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
};

const commonApi = {
    getArticle: () =>
        axios.get(`${API_URL}/articles`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),
    addArticle: (userId, forumId, status) =>
        axios.post(
            `${API_URL}/updateEnjoy`,
            {
                userId,
                forumId,
                status,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        ),
    editArticle: (article_id, name, is_house, ended, contract_amount) =>
        axios.put(
            `${API_URL}/getAchievement/${article_id}`,
            {
                name,
                is_house,
                ended,
                contract_amount,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        ),
    getAutoConstruction: () =>
        axios.get(`${API_URL}/constructions/autocomplete`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),
    getCompany: () =>
        axios.get(`${API_URL}/companies`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),
    addCompany: (
        name,
        bank_code,
        bank_name,
        bank_branch_code,
        bank_branch_name,
        bank_deposit_type_id,
        bank_account_number,
        bank_account_holder,
        transfer_fee_id
    ) =>
        axios.post(
            `${API_URL}/companies`,
            {
                name,
                bank_code,
                bank_name,
                bank_branch_code,
                bank_branch_name,
                bank_deposit_type_id,
                bank_account_number,
                bank_account_holder,
                transfer_fee_id,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        ),
    editCompany: (
        id,
        name,
        bank_code,
        bank_name,
        bank_branch_code,
        bank_branch_name,
        bank_deposit_type_id,
        bank_account_number,
        bank_account_holder,
        transfer_fee_id
    ) =>
        axios.put(
            `${API_URL}/companies/${id}`,
            {
                name,
                bank_code,
                bank_name,
                bank_branch_code,
                bank_branch_name,
                bank_deposit_type_id,
                bank_account_number,
                bank_account_holder,
                transfer_fee_id,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        ),
    getConstruction: (house) =>
        axios.get(`${API_URL}/constructions?house=` + house, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),
    getUsers: () =>
        axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),
    updateAccountStatus: (id, disabled) =>
        axios.put(
            `${API_URL}/users/${id}`,
            {
                disabled,
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        ),
};

export default commonApi;
