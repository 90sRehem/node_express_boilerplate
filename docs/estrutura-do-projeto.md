
# 🗄️ Estrutura do projeto

A maior parte do código reside na pasta `src` e tem a seguinte aparência:

```
src
|
+-- config            # Todas as configurações globais, variáveis de ambiente etc. São exportadas a partir daqui e usadas na aplicação.
|
+-- domain            # Todos os domínios da aplicação.
|
+-- lib               # Reexportar diferentes bibliotecas pré-configuradas para o aplicativo.
|
+-- types             # Types compartilhados, usados em toda a aplicação.
|
+-- utils             # Funções compartilhadas, usadas em toda a apliacação.
|
+-- shared            # Módulo responsável por conectar toda a aplicação
|
```

Para escalar o aplicativo da maneira mais fácil e sustentável, mantenha a maior parte do código dentro da pasta `domain`, que deve conter diferentes itens baseados nesses recursos. Cada pasta dentro de `domain` deve conter um código específico de domínio para um determinado recurso. Isso permitirá que você mantenha o escopo de funcionalidades para um recurso e não misture suas declarações com coisas compartilhadas. Isso é muito mais fácil de manter do que uma estrutura de pastas simples com muitos arquivos.

Um `domain` pode ter a seguinte estrutura:

```
src/domain/example
|
+-- dtos               # Um DTO é um objeto que define como os dados serão enviados pela rede.
|
+-- infra              # A camada de infraestrutura é como os dados inicialmente mantidos em entidades de domínio (em memória) são mantidos em bancos de dados ou outro repositório persistente.
|    |
|    +-- entities      # Pasta onde residem as entidades.
|    |
|    +-- http
|    |    |
|    |    +-- routes
|    |    |
|    |    +-- middlewares
|    |
|    + -- orm          # Pasta opicional para configuração de orm.
|          |
|          +-- entities
|          |
|          +-- repositories
|
+-- repositories       # O Repository é uma ponte entre nossa aplicação e a fonte de dados, seja ela um banco de dados, um arquivo físico ou qualquer outro meio de persistência de dados da aplicação.
|
+-- useCases           # Pasta que encapsula as regras de negócio da aplicação.
|
+-- utils              # Funções utilitárias para um recurso específico.
|
+-- index.ts           # Ponto de entrada para o recurso, ele deve servir como a API pública da feature fornecida e exportar tudo o que deve ser usado fora do domínio.
```

Uma pasta de domínio também pode conter outros domínios (se usados apenas dentro do domínio pai) ou ser mantido separada, é uma questão de preferência.

Tudo de um domínio deve ser exportado do arquivo `index.ts`, que se comporta como a API pública do domínio.

Você deve importar de outros domínios apenas usando:
`import { SomeFeature } from "@/domain/example"`

e não

`import { SomeFeature } from "@/domain/example/useCases/exampleFeature"`

Isso também pode ser configurado na configuração ESLint para impedir a importação posterior pela seguinte regra:

```
{
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@/domain/*/*'],
            },
        ],

    ...resto da configuração
}
```

Isso foi inspirado em como [NX] (https://nx.dev/) lida com bibliotecas que estão isoladas, mas disponíveis para serem usadas por outros módulos. Pense em um módulo como uma biblioteca que é independente, mas pode expor diferentes partes a outras features por meio de seu ponto de entrada.
