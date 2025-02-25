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

### Пример использования

#### Входные файлы:
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
node gendiff.js file1.json file2.json
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

## Демонстрация работы
Вы можете посмотреть запись работы утилиты на asciinema:
[![asciicast](https://asciinema.org/a/gFY8GOZtIYOL2LvQY0NGP3FbS.svg)](https://asciinema.org/a/gFY8GOZtIYOL2LvQY0NGP3FbS)

Результат вывода сравнения файлов:
[![asciicast](https://asciinema.org/a/nD5TwtAR4PzsQpVLVkF44GpHn.svg)](https://asciinema.org/a/nD5TwtAR4PzsQpVLVkF44GpHn)