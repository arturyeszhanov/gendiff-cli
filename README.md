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
   chmod +x src/gendiff.js
   ```

## Использование

### Справка
Для получения справки о доступных командах и опциях запустите:
```sh
gendiff -h
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

## 📌 Демонстрация работы
### Сравнение плоских файлов (JSON)
[![asciicast](https://asciinema.org/a/gKDzFxQ2vJJUlSNerhrglQGGz.svg)](https://asciinema.org/a/gKDzFxQ2vJJUlSNerhrglQGGz)

### Сравнение плоских файлов (YAML)
[![asciicast](https://asciinema.org/a/1WoQKVL6P8eGfUd6x2qBE1qHg.svg)](https://asciinema.org/a/1WoQKVL6P8eGfUd6x2qBE1qHg)

### Рекурсивное сравнение
[![asciicast](https://asciinema.org/a/o6G7FrV5lkBWYLcLI5ZDbuvCc.svg)](https://asciinema.org/a/o6G7FrV5lkBWYLcLI5ZDbuvCc)

### Плоский формат
[![asciicast](https://asciinema.org/a/k8FFT75GcCd9xfD2N3sOm5l4S.svg)](https://asciinema.org/a/k8FFT75GcCd9xfD2N3sOm5l4S)

### Вывод в JSON
[![asciicast](https://asciinema.org/a/bLaTulvpcdXLj0406hnuSJpjY.svg)](https://asciinema.org/a/bLaTulvpcdXLj0406hnuSJpjY)