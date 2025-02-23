import styled from 'styled-components';

export const FormContainer = styled.form`
    display: flex;
    height: 150px;
    gap: 10px;
    padding: 20px 0;
    justify-content: center;
    width: 600px;
    position: relative;

    & > input {
        margin: 0;
        padding: 10px;
        border-radius: 30px;
        padding-left: 30px;
        width: 100%;
        height: 100px;
        border: none;
        background-color: #444;
    }

    & button {
        position: absolute;
        right: 20px;
        top: 30px;
        justify-content: center;
        align-items: center;
        display: flex;
        border-radius: 50%;
        border: none;
        background-color: #ddd;
        color: white;
        cursor: pointer;
        height: 40px;
        width: 40px;
        color: #444;
        font-size: 20px;
    }
`;