<h2 align="center">
  MeasureAPI
</h2>

  <p align="start">Aplicação desenvolvida como forma de avaliação da empresa Shopper para a vaga de Full Stack Jr</p>
  <p align="start">Prazer, me chamo Allan, a seguir estarei apresentando a documentação da aplicação feita!</p>

## Diagrama de classes

````mermaid
erDiagram
Custumer {
        String custumer_code PK "Primary Key, UUID"
    }

    Measure {
        String measure_uuid PK "Primary Key, UUID"
        Int measure_value "Unique"
        DateTime measure_datetime
        Enum measure_type "WATER or GAS"
        Boolean has_confirmed "Default: false"
        String image_url
        String custumer_code FK "Foreign Key"
    }

    Custumer ||--o{ Measure : "measures"
    Measure }o--|| Custumer : "custumer"

````

## Tecnologias

- NodeJs
- NestJs
- Prisma
- Docker
- Postgres

  obs.: Como foi especificado que o .env deveria conter apenas acesso a chave Gemini, optei por deixar a url do banco no codigo, porem nao se preocupem, o banco de dados utilizado foi feito exclusivamente para esse teste.

## Branchs

Na branch principal irá conter apenas o docker-compose.yml e o readme mostrando a api totalmente dockerizada.
na branch "Codigo" estará o código para avaliação.

## Documentacao

Como não foi solicitado a rota de criação de usuário e foi definido que a API teria exclusivamente os 3 endpoints, tomei a liberdade de criar um e deixar registrado no banco para o uso dos testes

"customer_code": "59b9b5db-7574-4fd1-8958-21edf197a7c7"

### 1. POST "/upload"

{
"image": "base64",
"customer_code": "string",
"measure_datetime": "datetime",
"measure_type": "WATER" ou "GAS"
}

### 2. PATCH "/confirm"

  recebe 0 ou 1, onde 1 confirma a medida

{
"measure_uuid": "",
"confirmed_value": 1
}

### 3. GET "/:custumer_code/list?meaure_type="

measure_type é um argumento opcional

## Rodando

para rodar basta dar o 
``` docker-compose up ```

 
