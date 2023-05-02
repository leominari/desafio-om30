import {ref} from 'vue';

export function useCnsValidation(cns) {
    if (cns.trim().length !== 15) {
        return false;
    }

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

}
