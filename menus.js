export function menu() {
  console.log(`
  =================================
  |                               |
  |         MENU iNICIAL          |
  |                               |
  |-------------------------------|
  |                               |
  |   1 - Entrar                  |
  |   2 - Cadastrar               |
  |   3 - Sair                    |
  |                               |
  =================================`);
}

export function menu_cadastro_usuario() {
  console.clear();
  console.log(`
  =================================
  |                               |
  |           CADASTRO            |
  |-------------------------------|
  |   1 - Qual nome?              |
  |   2 - Email                   |
  |   3 - Senha                   |
  |   4 - Confirmar senha         |
  =================================`);
}

export function menu1() {
  console.log(`
  =================================
  |                               |
  |         MENU iNICIAL          |
  |                               |
  |-------------------------------|
  |                               |
  |   1 - Qual seu Email?         |
  |   2 - Qual Sua Senha?         |
  |   3 - Sair                    |
  |                               |
  =================================`);
}

export function menu_inicial(nomeDaPessoa) {
  console.clear();
  console.log(`
  ======================================================
  |                                                    |
  |     🔒  S I S T E M A   D E   S E N H A S  🔒 
  |                                                    |
  |          OLÁ, ${nomeDaPessoa}!, Tudo bem??         |
  |                                                    |
  ======================================================
  |                                                    |
  |   [ 1 ] 📝  Cadastrar nova senha                   |
  |   [ 2 ] 👁️  Ver senhas cadastradas                 |
  |   [ 3 ] ❌  Excluir senha
  |   [ 4 ] 🚪  Sair do sistema                        |
  |                                                    |
  ======================================================
    `);
}

export function menu_cadastro() {
  console.clear();
  console.log(`
  ======================================================
  |                                                    |
  |         C A D A S T R O  D E   S E N H A S         |
  |                                                    |
  |                                                    |
  |                                                    |
  ======================================================
  |                                                    |
  |   [ 1 ] Qual origem/serviço?                       |
  |   [ 2 ] Qual o Login??                             |
  |   [ 3 ] Descrição                                  | 
  |   [ 4 ] Qual a senha?                              |
  |   [ 5 ] Confirme a senha                           |
  |                                                    |
  ======================================================
    `);
}
