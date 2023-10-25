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

