import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($saveBook: BookInput!) {
    saveBook(saveBook: $saveBook) {
        _id
        username
        email
        bookCount
        savedBooks {
            authors
            bookId
            description
            image
            link
            title
        }
    }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            authors
            bookId
            description
            image
            link
            title
        }
    }
}
`;