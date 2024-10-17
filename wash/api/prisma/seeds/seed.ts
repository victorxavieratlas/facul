import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

async function main() {
  // Leitura do arquivo JSON
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './states_and_cities.json'), 'utf-8')
  );

  // Construir mapeamento de UF para stateId
  const ufToStateIdMap = new Map<string, number>();

  for (const stateIdStr in data.states) {
    const stateId = parseInt(stateIdStr, 10);
    const stateName = data.states[stateIdStr];
    const stateNameParts = stateName.split(' - ');
    const uf = stateNameParts[1];
    ufToStateIdMap.set(uf, stateId);
  }

  // Inserção dos estados
  for (const stateIdStr in data.states) {
    const stateId = parseInt(stateIdStr, 10);
    const stateName = data.states[stateIdStr];
    await prisma.state.create({
      data: {
        id: stateId,
        name: stateName,
      },
    });
  }

  // Leitura e parsing do arquivo CSV de cidades
  const citiesCsv = fs.readFileSync(path.resolve(__dirname, './cities.csv'), 'utf-8');
  const citiesRecords = parse(citiesCsv, {
    columns: true,
    delimiter: '|',
    skip_empty_lines: true,
  });

  // Inserção das cidades
  for (const record of citiesRecords) {
    const id_cidade = parseInt(record.id_cidade.trim(), 10);
    const cidade = record.cidade.trim();
    const uf = record.uf.trim();

    if (isNaN(id_cidade) || !uf) {
      console.warn(`Registro de cidade inválido: ${JSON.stringify(record)}`);
      continue;
    }

    const stateId = ufToStateIdMap.get(uf);
    if (!stateId) {
      console.warn(`UF ${uf} não encontrado no mapeamento de estados.`);
      continue;
    }

    try {
      await prisma.city.create({
        data: {
          id: id_cidade, // Usando 'id_cidade' como 'id' da cidade
          uf: uf,
          name: cidade,
          state: { connect: { id: stateId } },
          // Removemos 'id_city' se não for mais necessário
        },
      });
    } catch (error) {
      console.error(`Erro ao inserir a cidade ${cidade}: ${error.message}`);
    }
  }

  // Leitura e parsing do arquivo CSV de bairros
  const neighborhoodsCsv = fs.readFileSync(
    path.resolve(__dirname, './neighborhoods.csv'),
    'utf-8'
  );
  const neighborhoodsRecords = parse(neighborhoodsCsv, {
    columns: true,
    delimiter: '|',
    skip_empty_lines: true,
  });

  // Mapeamento de id_city para cityId no banco (agora id_cidade para cityId)
  const citiesInDb = await prisma.city.findMany({
    select: {
      id: true, // id agora é o id_cidade do CSV
    },
  });

  const cityIdSet = new Set<number>();

  for (const city of citiesInDb) {
    cityIdSet.add(city.id);
  }

  // Inserção dos bairros
  for (const record of neighborhoodsRecords) {
    const id_bairro = parseInt(record.id_bairro.trim(), 10);
    const bairro = record.bairro.trim();
    const id_cidade = parseInt(record.id_cidade.trim(), 10);

    if (isNaN(id_bairro) || isNaN(id_cidade)) {
      console.warn(`Registro de bairro inválido: ${JSON.stringify(record)}`);
      continue;
    }

    if (!cityIdSet.has(id_cidade)) {
      console.warn(`Cidade com id ${id_cidade} não encontrada no banco de dados.`);
      continue;
    }

    try {
      await prisma.neighborhoods.create({
        data: {
          id: id_bairro,
          idCity: id_cidade,
          city: { connect: { id: id_cidade } },
          name: bairro,
        },
      });
    } catch (error) {
      console.error(`Erro ao inserir o bairro ${bairro}: ${error.message}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
