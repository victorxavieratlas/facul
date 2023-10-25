DROP SCHEMA IF EXISTS aula12;
CREATE SCHEMA aula12;
USE aula12;

CREATE TABLE usuario (
    id INT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fone VARCHAR(20)
)ENGINE=InnoDB;

CREATE TABLE forum (
    id INT PRIMARY KEY,
    titulo VARCHAR(45) NOT NULL,
    data_criacao DATE
)ENGINE=InnoDB;

CREATE TABLE postagem (
    usuario_id INT PRIMARY KEY,
    forum_id INT PRIMARY KEY,
    mensagem TEXT NOT NULL,
    data_postagem DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (forum_id) REFERENCES forum(id)
)ENGINE=InnoDB;

DROP USER 'moderador'@'localhost' IF EXISTS;
CREATE USER 'moderador'@'localhost' IDENTIFIED BY '123teste';
GRANT INSERT, UPDATE, DELETE ON aula12.usuario, aula12.forum, aula12.postagem TO 'moderador'@'localhost';

DROP USER 'pikachu'@'localhost' IF EXISTS;
CREATE USER 'pikachu'@'localhost' IDENTIFIED BY 'teste123';
GRANT SELECT (mensagem) ON aula12.postagem TO 'pikachu'@'localhost';

DROP USER 'maverick'@'localhost' IF EXISTS;
CREATE USER 'maverick'@'localhost' IDENTIFIED BY 'topgun';
GRANT INSERT, UPDATE, DELETE ON aula12.forum, aula12.postagem TO 'maverick'@'localhost';
GRANT SELECT ON aula12.usuario TO 'maverick'@'localhost';
