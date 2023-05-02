import moment from "moment";

export const useCnsValidation = (cns) => {
    if (cns.replace(/[^\d]+/g, '').length === 15) {
        let soma = 0;
        let resto;
        let dv;
        let pis = cns.substring(0, 11);
        for (let i = 0; i < 11; i++) {
            soma += parseInt(pis.charAt(i)) * (15 - i);
        }
        resto = soma % 11;
        dv = 11 - resto;
        if (dv === 11) {
            dv = 0;
        }
        if (dv === 10) {
            soma = 0;

            for (let i = 0; i < 11; i++) {
                soma += parseInt(pis.charAt(i)) * (15 - i);
            }

            dv = 11 - (soma % 11);
            if (dv === 11) {
                dv = 0;
            }

            cns = pis + "001" + dv;
        } else {
            cns = pis + "000" + dv;
        }
        return cns === cns;
    } else {
        return false;
    }

}


export const useCpfValidation = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;

    if (cpf.length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var sum = 0;
    var remainder;
    for (var i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder == 10) || (remainder == 11)) {
        remainder = 0;
    }
    if (remainder != parseInt(cpf.substring(9, 10))) {
        return false;
    }
    sum = 0;
    for (var i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder == 10) || (remainder == 11)) {
        remainder = 0;
    }
    if (remainder != parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
}


export const useBirthDateValidation = (date) => {
    let birthDate = moment(date, 'DD/MM/YYYY')
    return birthDate.diff(moment()) < 0
}
