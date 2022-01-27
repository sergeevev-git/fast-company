export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            //   throw new Error("e-mail или password введены неверно");
            return "e-mail или password введены неверно";

        case "EMAIL_EXISTS":
            //   throw new Error("Пользователь с таким e-mail уже существует");
            return "Пользователь с таким e-mail уже существует";

        case "EMAIL_NOT_FOUND":
            //   throw new Error("e-mail или password введены неверно");
            return "e-mail или password введены неверно";

        default:
            //   throw new Error("Слишком много попыток входа. Попробуйте позднее.");
            return "Слишком много попыток входа. Попробуйте позднее.";
    }
}
