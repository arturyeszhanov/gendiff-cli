### Hexlet tests and linter status:
[![Actions Status](https://github.com/arturyeszhanov/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/arturyeszhanov/frontend-project-46/actions)

[![Node.js CI](https://github.com/arturyeszhanov/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/arturyeszhanov/frontend-project-46/actions)

[![Test Coverage](https://api.codeclimate.com/v1/badges/639d3e76f1b8874c925d/test_coverage)](https://codeclimate.com/github/arturyeszhanov/frontend-project-46/test_coverage)



# Вычислитель отличий (gendiff)

## Описание
**gendiff** — это CLI-утилита для сравнения двух конфигурационных файлов и отображения их различий. Программа поддерживает работу с JSON-файлами.

## Установка

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/arturyeszhanov/frontend-project-46.git
   cd frontend-project-46
   ```
2. Установите зависимости:
   ```sh
   npm install
   ```
3. Сделайте файл `gendiff.js` исполняемым:
   ```sh
   chmod +x gendiff.js
   ```

## Использование

### Справка
Для получения справки о доступных командах и опциях запустите:
```sh
node gendiff.js -h
```
Вывод:
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           output usage information
```

### Примеры использования
#### Сравнение JSON файлов:
##### Входные файлы:
**file1.json**:
```json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

**file2.json**:
```json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

#### Запуск
```sh
node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json
```

#### Вывод
```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
#### Сравнение YAML файлов:
##### Входные файлы:
**file1.yaml**:
```yaml
host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false
```

**file2.yaml**:
```yaml
host: hexlet.io
timeout: 20
verbose: true
```

#### Запуск
```sh
node bin/gendiff.js __fixtures__/file1.yaml __fixtures__/file2.yaml
```

#### Вывод
```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```


## 📌 Демонстрация работы
### Сравнение JSON-файлов
[![asciicast](https://asciinema.org/a/hs3AXwK3YCqvQ6ODd0He9j75f.svg)](https://asciinema.org/a/hs3AXwK3YCqvQ6ODd0He9j75f)

### Сравнение YAML-файлов
[![asciicast](https://asciinema.org/a/A8ncPgxxYmahemaGCdG1WkRtx.svg)](https://asciinema.org/a/A8ncPgxxYmahemaGCdG1WkRtx)

### Сравнение файлов JSON и YAML с вложенными структурами
[![asciicast](https://asciinema.org/a/a8IkIsboae9Oxd8vxmYxE1aPr.svg)](https://asciinema.org/a/a8IkIsboae9Oxd8vxmYxE1aPr)