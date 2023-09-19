export interface ErrorType {
    name: string,
    error: string
}

export const Errors = {
    ValidationError: 'ValidationError',

}

export const GeneralErrorTypes = {
    ParametersMissing: { name: 'ParametersMissing', message: 'Parameter\'s Missing' }
}

export const AuthErrorTypes = {
    UserNotExist: { name: 'UserNotExist', message: 'User Doesn\'t Exists!!' },
    UserExists: { name: 'UserExists', message: 'User Already Exists!!' },
    InvalidPassword: { name: 'InvalidPassword', message: 'Password Mismatch!!' },
    ParametersMissing: { name: 'ParametersMissing', message: 'Parameter\'s Missing' },
    TokenMissing: { name: 'TokenMissing', message: 'Unauthorized No Token' },
    IncorrectPassword: { name: 'IncorrectPassword', message: 'Password you\'ve Entered is Incorrect.' }
}
