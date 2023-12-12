DROP DATABASE IF EXISTS av2a;
CREATE DATABASE IF NOT EXISTS av2a;
USE av2a;

CREATE TABLE uf (
 id    INT AUTO_INCREMENT,
 sigla CHAR(2) NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE cidade (
 id      INT AUTO_INCREMENT,
 uf_id   INT NOT NULL,
 nome    VARCHAR(45) NOT NULL,
 capital BOOLEAN,
 PRIMARY KEY (id),
 FOREIGN KEY (uf_id) REFERENCES uf(id)
);

CREATE TABLE atleta (
 id         INT AUTO_INCREMENT,
 cidade_id  INT NOT NULL,
 apelido    VARCHAR(45) NOT NULL,
 altura     DECIMAL(10,2),
 peso       DECIMAL(10,2),
 PRIMARY KEY (id),
 FOREIGN KEY (cidade_id) REFERENCES cidade (id)
);

INSERT INTO uf(sigla) VALUES('RS');
INSERT INTO uf(sigla) VALUES('SP');
INSERT INTO uf(sigla) VALUES('RJ');
INSERT INTO uf(sigla) VALUES('MG');

INSERT INTO cidade(uf_id, nome, capital) VALUES(1, "Porto Alegre", TRUE);
INSERT INTO cidade(uf_id, nome, capital) VALUES(1, "Pelotas", FALSE);
INSERT INTO cidade(uf_id, nome, capital) VALUES(4, "Belo Horizonte", TRUE);
INSERT INTO cidade(uf_id, nome, capital) VALUES(3, "Rio de Janeiro", TRUE);
INSERT INTO cidade(uf_id, nome, capital) VALUES(2, "São Paulo", TRUE);
INSERT INTO cidade(uf_id, nome, capital) VALUES(2, "Campinas", FALSE);

INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(2, "Deusarina Venus de Milo", 1.80, 90.56);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(4, "Maxwelbe Texugo Berta", 2.25, 100.38);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(3, "Naida Navinda Navolta Pereira", 2.05, 111.49);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(1, "Dolores Fuertes de Barriga", 1.60, 78.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(3, "Primorosa Santos", 1.75, 68.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(6, "Berta Rachou", 1.78, 80.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(2, "Hypotenusa Pereira", 1.90, 80.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(5, "Maria Você Me Mata", 1.80, 80.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(1, "Alucinética Honorata", 1.80, 80.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(4, "Cibalena Dorilina Alfajor", 1.80, 80.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(3, "Frankstefferson", 1.80, 80.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(4, "Hericlapiton da Silva", 2.03, 99.28);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(3, "Ulisflávio Valdisnêi", 1.79, 88.78);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(6, "Free William da Silva", 2.00, 95.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(1, "Açafrão Fagundes", 1.68, 88.99);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(2, "Mangelstron Duracel", 1.70, 79.00);
INSERT INTO atleta(cidade_id, apelido, altura, peso) VALUES(1, "Rotsenaidil Silva", 1.75, 75.08);

