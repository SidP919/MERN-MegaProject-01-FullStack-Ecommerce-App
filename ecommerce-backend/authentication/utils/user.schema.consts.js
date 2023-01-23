const USER_SCHEMA_CONSTS = {

    FULLNAME_MAX_LENGTH:35,
    USERNAME_MAX_LENGTH:26,
    USERNAME_MIN_LENGTH:8,
    USERNAME_MATCH_REGEXP: new RegExp(/^[a-zA-Z0-9_-]{8,26}$/),
    EMAIL_MATCH_REGEXP: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    PASSWORD_MIN_LENGTH:8,

}

export default USER_SCHEMA_CONSTS;