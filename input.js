import * as readline from 'node:readline/promises';
import{stdin as input, stdout as output} from 'node:process';

export async function lerEntrada(mensagem){
    var rl = readline.createInterface({input, output});
    var resposta = await rl.question(mensagem);
    rl.close();
    return resposta;
}




