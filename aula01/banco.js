const Database = require('better-sqlite3');

// Cria o banco
const db = new Database('lanches.db');

// ex 1 - Criar a tabela

db.exec(`
    CREATE TABLE IF NOT EXISTS lanches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL
    )
`);

console.log('Tabela lanches criada');

// ex 2 - Inserir dados

const inserir = db.prepare(`
    INSERT INTO lanches (nome, preco)
    VALUES (?, ?)
`);

inserir.run('X-Salada', 15.00);
inserir.run('X-Bacon', 18.00);
inserir.run('X-Frango', 17.00);
inserir.run('X-Tudo', 22.00);

console.log('4 lanches inseridos');

// ex 3 - Listar todos

const todos = db.prepare(`
    SELECT * FROM lanches
`).all();

console.log('\nTodos os lanches:');
console.log(todos);

// ex 4 - Buscar com filtro

const lanchesCaros = db.prepare(`
    SELECT * FROM lanches
    WHERE preco > ?
`).all(17);

console.log('\nLanches com preço acima de R$ 17:');
console.log(lanchesCaros);

// ex 5 - Atualizar e remover

const atualizar = db.prepare(`
    UPDATE lanches
    SET preco = ?
    WHERE id = ?
`);

atualizar.run(16.00, 1);

const remover = db.prepare(`
    DELETE FROM lanches
    WHERE id = ?
`);

remover.run(3);

// Lista novamente para conferir
const resultadoFinal = db.prepare(`
    SELECT * FROM lanches
`).all();

console.log('\nLanches após atualizar e remover:');
console.log(resultadoFinal);

// Fecha o banco
db.close();

