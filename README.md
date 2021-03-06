<h3>Documentação da API Business</h3>
<hr>
<p>Esta é uma aplicação desenvolvida em Node.js com endpoints REST para cadastro de clientes e cidades. As dependências
    utilizadas foram as seguintes:</p>
<ul>
    <li>body-parser</li>
    <li>dotenv</li>
    <li>ejs</li>
    <li>method-override</li>
    <li>mongoose</li>
    <li>nodemon</li>
    <li>express</li>
    <li>express-ejs-layouts</li>
    <li>express-validator</li>
</ul>
<p>Utilize a ferramenta Postman para realizar o teste das rotas da API. Além disso, é possível testar a aplicação
    utilizando uma interface gráfica para
    gerenciamento de cidades, que pode ser acessada pelo menu superior, que contém os links Gerenciar
    Cidades.</p>
<ul>
    <li>http://localhost:3000/cities: URL para gerenciamento de cidades.</li>
    <li>http://localhost:3000/api: URL de acesso à API.</li>
</ul>
<p>Para executar a aplicação, siga estes passos:</p>
<ul>
    <li>Clone o repositório do projeto com o comando "git clone https://github.com/edinilsonvida/nodejs-mvc".</li>
    <li>Acesse o diretório do projeto utilizando o comando "cd nodejs-mvc".</li>
    <li>Instale todas as dependências utilizando o comando "npm install". </li>
    <li>Caso necessite, instale o "nodemon" para gerenciar as alterações da aplicação utilizando o comando "npm install
        nodemon".</li>
    <li>Acesse o arquivo ".env" para gerenciar as configurações de acesso (DATABASE_URL, NODE_ENV, PORT).</li>
    <li>Inicie a aplicação utilizando o comando "nodemon server.js".</li>
    <li>Abra o URL "http://localhost:3000" para utilizar a aplicação.</li>
</ul>
<h4>Informações das Coleções</h4>
<table>
    <thead>
        <tr>
            <th>Coleções</th>
            <th>Atributos</th>
            <th>Exemplos</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>City</td>
            <td>id, name, state</td>
            <td>
                {
                "_id": "602b2ae306784834a81e3c0d",
                "name": "Florianópolis",
                "state": "SC",
                "__v": 0
                }
            </td>
        </tr>
    </tbody>
</table>
<h4>Informações das Rotas de Cidades</h4>
<table>
    <thead>
        <tr>
            <th>Métodos</th>
            <th>URLs</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>GET</td>
            <td>/api/cities</td>
            <td>Retornar a listagem de todas as cidades.</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/api/cities</td>
            <td>Cadastrar uma cidade.</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/cities</td>
            <td>Excluir todas as cidades.</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/cities/:id</td>
            <td>Listar as informações de uma única cidade pelo id.</td>
        </tr>
        <tr>
            <td>PUT</td>
            <td>/api/cities/:id</td>
            <td>Atualizar as informações de uma única cidade pelo id.</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/cities/:id</td>
            <td>Excluir uma cidade específica pelo id.</td>
        </tr>
    </tbody>
</table>
