import crypto from "crypto";
import { lerEntrada } from "./input.js";
import { menu, menu_cadastro_usuario } from "./menus.js";
import { menu_inicial } from "./menus.js";
import { menu_cadastro } from "./menus.js";
import { conexao, inicializarBanco } from "./db.js";
import { menu1 } from "./menus.js";
import "dotenv/config";
import { Buffer } from "buffer";

var usuario_logado = null;

async function cadastrar_senha() {
  var origem = await lerEntrada(
    "Qual a origem/serviço?? (ex: Netflix, spotify ...): ",
  );
  console.log(".");
  console.log(".");
  console.log(
    "........................................................................",
  );

  var login = await lerEntrada("Qual o login/email/cpf???: ");
  console.log(".");
  console.log(".");
  console.log(
    "........................................................................",
  );

  var senha1 = "";
  var senha2 = "";
  let confereSenha = false;

  while (confereSenha != true) {
    senha1 = await lerEntrada("Digite a Senha: ");
    console.log(".");
    console.log(".");
    console.log(
      "........................................................................",
    );
    senha2 = await lerEntrada("confirme a senha: ");
    console.log(".");
    console.log(".");
    console.log(
      "........................................................................",
    );

    if (senha1 == senha2) {
      confereSenha = true;
      console.log("Senha cadastrada!!!!!");
      console.log(".");
      console.log(".");
      console.log(
        "........................................................................",
      );
    } else {
      console.log("Senha errada, digite novamente!!");
      console.log(".");
      console.log(".");
      console.log(
        "........................................................................",
      );
    }
  }

  var descricao = await lerEntrada("Adicione Descrição (se for necessário): ");
  console.log(".");
  console.log(".");
  console.log(
    "........................................................................",
  );

  if (descricao == "" || descricao == " ") {
    descricao = "Sem Descrição";
  }

  const novaSenha = {
    origem: origem,
    login: login,
    senha: senha1,
    descricao: descricao,
  };

  console.log(".");
  console.log(".");
  console.log(
    "........................................................................",
  );
  console.log("SENHA CADASTRADA COM SUCESSO !!!!!!!!!!");
  console.log(
    "........................................................................",
  );
  console.log(`origem: ${novaSenha.origem}`);
  console.log(`Login: ${novaSenha.login}`);
  console.log(`Senha: ${novaSenha.senha}`);
  console.log(`Descrição: ${novaSenha.descricao}`);

  await lerEntrada("pressione enter para voltar!!!");
}

async function cadastro() {
  menu_cadastro_usuario();
  var cadastro_nome;
  var cadastro_email;
  var conf_senha = false;
  var cadastro_senha1;
  var cadastro_senha2;

  cadastro_nome = await lerEntrada("[1] Digite o nome: ");
  cadastro_email = await lerEntrada("[2] Digite o email: ");

  while (conf_senha != true) {
    cadastro_senha1 = await lerEntrada("[3] Digite a senha: ");
    cadastro_senha2 = await lerEntrada("[4] Digite a senha Novamente: ");

    if (cadastro_senha1 != cadastro_senha2) {
      console.log("digite a senha novamente!!");
    } else if (cadastro_senha1 == cadastro_senha2) {
      conf_senha = true;

      try {
        console.log("salvando no banco...");

        const salt = crypto.randomBytes(16).toString("hex");
        const senha_hash = crypto
          .pbkdf2Sync(cadastro_senha1, salt, 100000, 64, "sha512")
          .toString("hex");

        const sql = `INSERT INTO usuarios(nome, email, senha, salt) VALUES(?,?,?,?)`;

        await conexao.execute(sql, [
          cadastro_nome,
          cadastro_email,
          senha_hash,
          salt,
        ]);

        console.log("✅ Usuário cadastrado com sucesso!\n");

        usuario_logado = cadastro_nome;
      } catch (erro) {
        if (erro.code === "ER_DUP_ENTRY") {
          console.log("\n❌ Erro: Esse email já está cadastrado!\n");
        } else {
          console.log("\n❌ Erro no banco de dados:", erro.message, "\n");
        }
      }
    }
  }
}

async function main() {
  await inicializarBanco();

  var opcao = 0;

  while (opcao != 3) {
    menu();
    opcao = await lerEntrada("--> Digite uma opção: ");

    if (opcao == 1) {
      menu1();

      var login_email = await lerEntrada("[1]- Digite o Email: ");
      var login_senha = await lerEntrada("[2]- Digite a Senha: ");

      try {
        const sql_busca = `select * from usuarios WHERE email = ?`;
        const [linhas] = await conexao.execute(sql_busca, [login_email]);

        if (linhas.length == 0) {
          console.log("error???");
        } else {
          const usuarioEncontrado = linhas[0];

          // 4. Trituramos a senha que a pessoa acabou de digitar usando o MESMO salt do banco
          const hashDaTentativa = crypto
            .pbkdf2Sync(
              login_senha,
              usuarioEncontrado.salt,
              100000,
              64,
              "sha512",
            )
            .toString("hex");

          if (hashDaTentativa == usuarioEncontrado.senha) {
            console.log("login realizado com sucess!!!!");

            usuario_logado = usuarioEncontrado.nome;

            var opcao1 = 0;

            while (opcao1 != 4) {
              console.clear();
              menu_inicial(usuario_logado);

              opcao1 = await lerEntrada("Escolha uma opção: ");

              if (opcao1 == 1) {
                menu_cadastro();

                var origem_cadastro = await lerEntrada(
                  "[1]- Digite o Serviço: ",
                );
                var login_cadastro = await lerEntrada("[2]- Digite o Login: ");

                var descricao_cadastro = await lerEntrada(
                  "[3]- Digite Alguma Descrição: ",
                );

                if (descricao_cadastro == "" || descricao_cadastro == " ") {
                  descricao_cadastro = "Sem Descrição";
                }

                var senha_cadastro;
                var senha_cadastro_confirmacao = null;
                var senha_cadastro2;

                while (senha_cadastro_confirmacao != true) {
                  senha_cadastro = await lerEntrada("[4]- Digite a senha: ");
                  senha_cadastro2 = await lerEntrada(
                    "[5]- Digite novamente a senha: ",
                  );

                  if (senha_cadastro != senha_cadastro2) {
                    console.log("ERRO!!! DiGiTe A SeNhA nOvAmEnTe!!!");
                  } else if (senha_cadastro == senha_cadastro2) {
                    senha_cadastro_confirmacao = true;

                    try {
                      console.log("Salvando senha no Banco!");

                      const CHAVE_MESTRE = process.env.CHAVE_MESTRE;

                      const iv = crypto.randomBytes(16);

                      const cadeado = crypto.createCipheriv(
                        "aes-256-cbc",
                        Buffer.from(CHAVE_MESTRE),
                        iv,
                      );

                      let senha_criptografada = cadeado.update(
                        senha_cadastro,
                        "utf8",
                        "hex",
                      );
                      senha_criptografada += cadeado.final("hex");

                      const sql_cadastro = `INSERT INTO cofre (usuario_id, servico, login, descricao, senha, iv) VALUES (?,?,?,?,?,?)`;

                      await conexao.execute(sql_cadastro, [
                        usuarioEncontrado.id,
                        origem_cadastro,
                        login_cadastro,
                        descricao_cadastro,
                        senha_criptografada,
                        iv.toString("hex"),
                      ]);

                      console.log("SENHA CADASTRADA COM SUCESSO!!!!!!!!!!");
                    } catch (erro) {
                      console.log("Erro ao salvar no cofre", erro.message);
                      await lerEntrada("Pressione enter para continuar.");
                    }
                  }
                }
              } else if (opcao1 == 2) {
                console.clear();
                console.log(
                  "======================================================",
                );
                console.log(
                  "|              🔐 SEU COFRE DE SENHAS 🔐             |",
                );
                console.log(
                  "======================================================",
                );

                try {
                  const sql_busca_cofre = `SELECT * FROM cofre where usuario_id = ?`;
                  const [senhas_salvas] = await conexao.execute(
                    sql_busca_cofre,
                    [usuarioEncontrado.id],
                  );

                  if (senhas_salvas.length == 0) {
                    console.log("Sem senhas cadastradas!!!");
                  } else {
                    const CHAVE_MESTRE = process.env.CHAVE_MESTRE;

                    for (let i = 0; i < senhas_salvas.length; i++) {
                      let linhas = senhas_salvas[i];

                      const ivBuffer = Buffer.from(linhas.iv, "hex");

                      const destrancador = crypto.createDecipheriv(
                        "aes-256-cbc",
                        Buffer.from(CHAVE_MESTRE),
                        ivBuffer,
                      );

                      let senha_original = destrancador.update(
                        linhas.senha,
                        "hex",
                        "utf8",
                      );
                      senha_original += destrancador.final("utf8");

                      console.log(`\n🔹 Serviço: ${linhas.servico}`);
                      console.log(`   Login:   ${linhas.login}`);
                      console.log(`    Desc:   ${linhas.descricao}`);
                      console.log(`   Senha:   ${senha_original}`);
                      console.log(
                        "------------------------------------------------------",
                      );
                    }
                  }

                  await lerEntrada("Pressione Enter para voltar ao menu...");
                } catch (erro) {
                  console.log("Erro ao buscar as senhas", erro.message);
                  await lerEntrada("Pressione Enter para voltar!!!");
                }
              } else if (opcao1 == 3) {
                console.clear();
                console.log(
                  "======================================================",
                );
                console.log(
                  "|              🗑️  EXCLUIR UMA SENHA 🗑️              |",
                );
                console.log(
                  "======================================================",
                );

                var servico_excluir = await lerEntrada(
                  "Digitr o nome do serviço que deseja excluir: ",
                );

                try {
                  const sql_excluir = `DELETE FROM cofre where usuario_id = ? and servico = ?`;
                  const [resultado] = await conexao.execute(sql_excluir, [
                    usuarioEncontrado.id,
                    servico_excluir,
                  ]);

                  if (resultado.affectedRows > 0) {
                    console.log(
                      `A senha do serviço '${servico_excluir}' foi apagado com suscesso`,
                    );
                  } else {
                    console.log(
                      `Não encontramos nenhuma senha salva para o serviço ${servico_excluir}`,
                    );
                  }

                  await lerEntrada("Pressione enter para voltar: ");
                } catch (erro) {
                  console.log("erro ao excluir", erro.message);
                  await lerEntrada("Pressione enter para voltar..");
                }
              } else if (opcao1 == 4) {
                console.log("Saindo!!!");
                opcao = 3;
              }
            }
          } else {
            console.log("\n❌ Erro: Senha incorreta!\n");
          }
        }
      } catch (erro) {
        console.log("\n❌ Erro no banco de dados:", erro.message, "\n");
      }
    } else if (opcao == 2) {
      await cadastro();
    } else if (opcao == 3) {
      console.log("Saindo, tchau!!!");
      console.clear();
    }
  }
}

main();
