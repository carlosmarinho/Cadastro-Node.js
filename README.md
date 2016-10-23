# Cadastro de Cliente

a [Sails](http://sailsjs.org) application

<h2>Banco de Dados</h2>

<ul>
  <li>O banco de dados está comprimido no formato rar o arquivo é o: mongodb.rar</li>
  <li>Caso seja usado esta versão do banco de dados o usuário administrador é o: <strong>admin</strong> e a senha <strong>carlos</strong></li>
  <li>Caso queira zerar o banco de dados ao startar a aplicação (podendo usar a <strong>opção 3</strong> ao executar o comando <strong>sails lift</strong>), o primeiro usuário a ser cadastrado será o administrador, os outros serão usuários comuns sem permissões administrativas.
</ul>

<h2>Email</h2>

<ul>
  <li>Ao desenvolver o envio de email usei o plugin sails-hook-email o qual tive problema local com o Windows ao enviar email estava dando erro <strong>Error: self signed certificate in certificate chain] code: 'SELF_SIGNED_CERT_IN_CHAIN'</strong>
  </li>
  <li>Devido a este problema de SSL verifiquei que o mesmo envia email para um arquivo em desenvolvimento caso deixe uma variavel de configuração local habilitada, dessa forma configurei o envio de email para enviar para o arquivo txt que é o: '.tmp/email.txt'</li>
  <li>A variavel de configuração alterada é a: <strong>testMode</strong> no arquivo 'node_modules/sails-hook-email/index.js'. Caso queira tirar de teste basta modificar esta variável para false</li>
  <li>Vale lembrar também que tem que configurar o serviço de email neste mesmo arquivo, no meu caso, só está faltando colocar a senha, mas como estava dando erro deixei sem a minha senha mesmo. Caso queiram testar o envio de email mesmo não esqueçam de fazer essa configuração</li>
</ul>


