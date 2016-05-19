let fish = "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." +
    "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." +
    "Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumlaborum.";

let testStr = "Alfred Aho likes to code";

/** Нормализация текста с преобразованием строки в массив split() */
console.log(getNormalString(testStr, 10));

/** Нормализация текста с использование поиска под строки */
console.log(getNormalString2(testStr, 10));

function getNormalString(str, constraint) {
    /** Находим все вхождения знаков припинания '. , ! ?', ставим пробел после вхождения */
    str = str.replace(/\.|\,|\!|\?/g, function (match, offset, string) {
        return match + ' ';
    });

    /** Удаляем лишние пробелы 2+ */
    str = str.replace(/  +/g, ' ');

    /** Преобразование строки в массив слов */
    let strWords = str.split(' ');

    /** Длина массива */
    let wordsLength = strWords.length;

    /** Инициализация начальных переменных
     * @normalString - массив строк
     * @i - счетчик слов*/
    let normalString = [];
    let i = 0;

    while (i < wordsLength) {
        let string = strWords[i];

        /** Добавляем в строку пока ёё длина не превышает constraint */
        while ((string + ' ' + strWords[i + 1]).length < constraint) {
            string += ' ' + strWords[i + 1];
            i++;
        }

        /** Добавляем строку в масив*/
        normalString.push(string);
        i++;
    }

    return normalString.join('\n');
}

function getNormalString2(str, constraint) {
    /** Находим все вхождения знаков припинания '. , ! ?', ставим пробел после вхождения */
    str = str.replace(/\.|\,|\!|\?/g, function (match, offset, string) {
        return match + ' ';
    });

    /** Удаляем лишние пробелы 2+ */
    str = str.replace(/  +/g, ' ');

    /** Инициализация начальных переменных
     * @start - начало строки
     * @end - конец строки
     * @normalString - инициализация нормализированной строки
     * @substr - инициализация подстроки*/
    let start = 0;
    let end = constraint;
    let normalString = '';
    let substr;

    while (end <= str.length) {
        let index;

        /** Находим подстроку длинной constraint*/
        substr = str.substring(start, end);

        /** Находим последнее вхождение пробела, так как подстрока может закончиться на 'средине' слова*/
        index = substr.lastIndexOf(' ');

        /** Проверяем был ли найдем пробел*/
        if (index + 1) {
            end = index + start;

            /** Добавляем подстроку в нормализированную строку*/
            normalString += str.substring(start, end) + '\n';
        } else {
            /** Выбераем новую подстроку от @start до конца первоночальной строки*/
            substr = str.substring(start, str.length - 1);

            /** Находим первое вхождение пробела*/
            index = substr.indexOf(' ');

            /** Если index равен -1 тогда берем длину всей подстроки*/
            end = index + 1 ? index + start : substr.length + start;
            substr = str.substring(start, end);

            /** Добавляем подстроку в нормализированную строку*/
            normalString += substr + '\n';
        }

        /** Выбераем следующий участов длиной constraint + 1*/
        start = end + 1;
        end = start + constraint + 1;
    }

    /** Добавляем последнюю подстроку в нормализированную строку*/
    normalString += str.substring(start, end + 1);

    return normalString;
}